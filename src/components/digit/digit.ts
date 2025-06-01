import {animate, AnimateController} from '@lit-labs/motion';
import {html, LitElement, type PropertyValues} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';
import DigitAnimationEvent, {
  type DigitAnimationEventName,
} from '../../events/digit-animation.js';
import {styles} from './styles.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
export const DEFAULT_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Step = -1 | 0 | 1;
export type Direction = 'forward' | 'backward' | 'shortest';

/**
 * A custom element that displays a single spinning digit. The digit can be
 * animated to a new value. This element is intended for use in digit spinners,
 * and is not intended for direct use.
 *
 * @fires digit-flip-start - Fired when the digit flipping animation begins.
 *    The event has the following properties:
 *      * `from`: the digit value before the flip
 *      * `to`: the digit value after the flip
 *
 * @fires digit-flip-end - Fired when the digit flipping animation completes.
 *    The event has the following properties:
 *      * `from`: the digit value before the flip
 *      * `to`: the digit value after the flip
 *
 * @fires digit-wrap - Fired when the digit wraps forward from 9 to 0, or backward from 0 to 9.
 *    The event has the following properties:
 *      * `from`: the digit value before the wrap
 *      * `to`: the digit value after the wrap
 *      * `direction`: the direction of the wrap
 *
 
 * @cssprop [--digit-background] - The background color of the digit
 * @cssprop [--digit-border-radius] - The border radius of the digit
 * @cssprop [--digit-box-shadow] - The box shadow of the digit
 * @cssprop [--digit-color] - The color of the digit
 * @cssprop [--digit-font-size] - The font size of the digit, also set by the `--spinner-font-size` custom property
 * @cssprop [--digit-text-shadow] - The text shadow of the digit, defaults to none
 *
 * @csspart digit-wrapper - The wrapper element for the digits
 * @csspart digit - The digit element
 */
@customElement('spinning-digit')
export class SpinningDigit extends LitElement {
  static override styles = styles;

  /**
   * The value of the digit. This value is updated immediately, and may not match
   * the displayed value if the digit is animating.
   */
  @property({type: Number, reflect: true}) value = 0;

  /**
   * The direction of the digit transition.
   *
   * * If `forward`, the digit value will increase (e.g. from 9 to 0) until the
   *   target value is reached.
   * * If `backward`, the digit value will decrease (e.g. from 0 to 9) until the
   *   target value is reached.
   * * If `shortest`, the digit value will take the shortest path
   *   (either forward or backward) to the target value.
   */
  @property({type: String}) direction: Direction = 'forward';

  /**
   * The duration of the digit transition in milliseconds.
   */
  @property({type: Number}) duration = 200;

  /**
   * The easing function to use for the digit transition.
   */
  @property({type: String}) easing = 'cubic-bezier(0.83, 0, 0.17, 1)';

  /**
   * The digit that is currently displayed. This value changes as the digit flips
   * in and out of view.
   */
  @state() private _displayValue = 0;

  /**
   * A counter that tracks the number of steps that have been requested to be
   * performed, but not yet completed.
   */
  @state() private _pendingSteps = 0;

  /**
   * The digit value that the digit is currently animating from.
   */
  private _lastFrom: number | null = null;

  /**
   * The digit value that the digit is currently animating to.
   */
  private _lastTo: number | null = null;

  private _animationController = new AnimateController(this, {
    onComplete: () => this._handleAnimationComplete(),
  });

  // ---------------------------------------------------------------------------
  // #region Lifecycle
  // ---------------------------------------------------------------------------
  protected override firstUpdated(changed: PropertyValues) {
    if (changed.has('value')) {
      this._enqueueStep();
    }
  }

  protected override updated(changed: PropertyValues) {
    if (changed.has('value')) {
      this._enqueueStep();
    }
  }

  override render() {
    const count = DEFAULT_DIGITS.length;
    const center = Math.trunc(count / 2);

    return html`
      <div class="digit-wrapper" part="digit-wrapper">
        ${DEFAULT_DIGITS.map((_, i) => {
          const order = (count + center + i - this._displayValue) % count;
          const zIndex = order === 0 || order === count - 1 ? -1 : 1;
          return html`
            <div
              class="digit"
              part="digit"
              style=${styleMap({
                order: String(order),
                zIndex: String(zIndex),
              })}
              ${animate({
                keyframeOptions: {
                  duration: this.duration,
                  easing: this.easing,
                },
              })}
            >
              ${i}
            </div>
          `;
        })}
      </div>
    `;
  }
  // #endregion Lifecycle

  // ---------------------------------------------------------------------------
  // #region Private Methods
  // ---------------------------------------------------------------------------
  /**
   * Handles the completion of an animation. Dispatches a 'digit-flip-end' event
   * with details of the transition, then dequeues the next step if necessary.
   */
  private _handleAnimationComplete() {
    if (this._lastFrom !== null && this._lastTo !== null) {
      // end-of‐flip
      this._dispatchEvent('digit-flip-end', {
        from: this._lastFrom,
        to: this._lastTo,
      });
      this._dequeueStep();
    }
  }

  private _enqueueStep(): void {
    if (!this._animationController.isAnimating) {
      const {dir, dist} = this._computeStepParams(
        this._displayValue,
        this.value,
        DEFAULT_DIGITS.length,
        this.direction
      );
      if (dist === 0) return;
      this._pendingSteps = dir * dist;
      this._dequeueStep();
    }
  }

  /**
   * Dequeues one step, computes old/new display values, then
   * dispatches all the detail-rich events before bumping
   * `_displayValue` to fire the actual motion.
   */
  private _dequeueStep(): void {
    if (this._pendingSteps === 0) return;

    const dir = Math.sign(this._pendingSteps) as Step;
    this._pendingSteps -= dir;

    const oldValue = this._displayValue;
    const newValue = this._shift(oldValue + dir);

    this._lastFrom = oldValue;
    this._lastTo = newValue;

    // flip-start
    this._dispatchEvent('digit-flip-start', {from: oldValue, to: newValue});

    // special wrap events
    if (oldValue === DEFAULT_DIGITS.length - 1 && newValue === 0) {
      this._dispatchEvent('digit-wrap', {
        from: oldValue,
        to: newValue,
        direction: 'forward',
      });
    } else if (oldValue === 0 && newValue === DEFAULT_DIGITS.length - 1) {
      this._dispatchEvent('digit-wrap', {
        from: oldValue,
        to: newValue,
        direction: 'backward',
      });
    }

    // trigger the visual flip
    this._displayValue = newValue;
  }

  /**
   * Computes the direction and distance for the digit step transition.
   *
   * @param current - The current digit position.
   * @param target - The target digit position.
   * @param count - The total number of digits.
   * @param mode - The direction mode ('forward', 'backward', 'shortest').
   * @returns An object containing the direction (`dir`) and distance (`dist`)
   *          for moving from the current to the target position.
   */
  private _computeStepParams(
    current: number,
    target: number,
    count: number,
    mode: Direction
  ): {dir: 1 | -1; dist: number} {
    const forward = (target - current + count) % count;
    const backward = (current - target + count) % count;
    switch (mode) {
      case 'forward':
        return {dir: 1, dist: forward};
      case 'backward':
        return {dir: -1, dist: backward};
      case 'shortest':
      default:
        return forward <= backward
          ? {dir: 1, dist: forward}
          : {dir: -1, dist: backward};
    }
  }

  private _dispatchEvent(
    name: DigitAnimationEventName,
    detail: {
      from: number;
      to: number;
      direction?: Exclude<Direction, 'shortest'>;
    }
  ): void {
    const event = new DigitAnimationEvent(
      name,
      detail.from,
      detail.to,
      detail.direction
    );
    this.dispatchEvent(event);
  }

  private _shift(i: number): number {
    const last = DEFAULT_DIGITS.length - 1;
    if (i > last) return 0;
    if (i < 0) return last;
    return i;
  }
  // #endregion Private Methods

  // ---------------------------------------------------------------------------
  // #region Public Methods
  // ---------------------------------------------------------------------------

  /**
   * Increment the digit value by `num`
   * @param {number} num Number of digits to increment
   */
  public increment(num = 1): void {
    this.value = this._shift(this.value + num);
    this._pendingSteps += num;
    this._dequeueStep();
  }

  /**
   * Decrement the digit value by `num`
   * @param {number} num Number of digits to decrement
   */
  public decrement(num = 1): void {
    this.value = this._shift(this.value - num);
    this._pendingSteps -= num;
    this._dequeueStep();
  }
  // #endregion Public Methods
}

declare global {
  interface HTMLElementTagNameMap {
    'spinning-digit': SpinningDigit;
  }
}
