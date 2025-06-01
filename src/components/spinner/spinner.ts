import {html, LitElement, PropertyValueMap} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {repeat} from 'lit/directives/repeat.js';
import '../digit/digit.js';
import {type Direction} from '../digit/digit.js';
import {styles} from './styles.js';

/**
 * A digit spinner web component. Displays a numeric value as a sequence of
 * animated digit elements.
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
 * @cssprop [--spinner-background] - The background color of the spinner
 * @cssprop [--spinner-border-color] - The border color of the spinner
 * @cssprop [--spinner-border-width] - The border width of the spinner
 * @cssprop [--spinner-border-radius] - The border radius of the spinner
 * @cssprop [--spinner-font-family] - The font family of the spinner
 * @cssprop [--spinner-font-size] - The font size of the spinner, also set by the `--digit-font-size` custom property
 * @cssprop [--spinner-padding] - The padding of the spinner
 * @cssprop [--digit-background] - The background color of the digit
 * @cssprop [--digit-border-radius] - The border radius of the digit
 * @cssprop [--digit-box-shadow] - The box shadow of the digit
 * @cssprop [--digit-color] - The color of the digit
 * @cssprop [--digit-font-size] - The font size of the digit, also set by the `--spinner-font-size` custom property
 * @cssprop [--digit-spacing] - The spacing between digits
 * @cssprop [--digit-text-shadow] - The text shadow of the digit, defaults to none
 *
 * @csspart digit - The elements that represent an individual digit
 * @csspart digit-wrapper - A wrapper element surrounding an individual digit
 * @csspart first-digit - The element representing the first digit
 * @csspart first-digit-wrapper - The wrapper element surrounding the first digit
 * @csspart last-digit - The element representing the last digit
 * @csspart last-digit-wrapper - The wrapper element surrounding the last digit
 *
 */
@customElement('digit-spinner')
export class DigitSpinner extends LitElement {
  static override styles = styles;

  /**
   * The numeric value displayed by the spinner.
   */
  @property({type: Number, reflect: true}) value = 0;

  /** Determines whether digits animate "forward” or "backward" or "shortest" path. */
  @property({type: String}) direction: Direction = 'forward';

  /** The duration of a single digit flip animation. */
  @property({type: Number}) duration = 200;

  /**
   * The easing function to use for the digit transition.
   */
  @property({type: String}) easing = 'cubic-bezier(0.83, 0, 0.17, 1)';

  /**
   * Minimum number of digit slots to render (pads with leading zeros).
   * e.g. if value="195" and min-digits="5", you get 0, 0, 1, 9, 5.
   */
  @property({type: Number, attribute: 'min-digits'})
  minDigits = 0;

  override shouldUpdate(
    changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ) {
    // -------------------------------------------------------------------------
    // min-digits validation
    // -------------------------------------------------------------------------
    if (changedProperties.has('minDigits') && this.minDigits < 0) {
      console.error('digit-spinner: min-digits must be non-negative');
      return false;
    }
    if (String(this.value).length > this.minDigits && this.minDigits !== 0) {
      console.error(
        'digit-spinner: min-digits must be greater than or equal to value length'
      );
      return false;
    }
    // -------------------------------------------------------------------------
    // duration validation
    // -------------------------------------------------------------------------
    if (
      changedProperties.has('duration') &&
      changedProperties.get('duration') < 0
    ) {
      console.error('digit-spinner: duration must be non-negative');
      return false;
    }
    // -------------------------------------------------------------------------
    // value validation
    // -------------------------------------------------------------------------
    if (changedProperties.has('value') && changedProperties.get('value') < 0) {
      console.error('digit-spinner: value must be non-negative');
      return false;
    }
    // -------------------------------------------------------------------------
    // direction validation
    // -------------------------------------------------------------------------
    if (
      changedProperties.has('direction') &&
      !['forward', 'backward', 'shortest', undefined].includes(
        changedProperties.get('direction')
      )
    ) {
      console.error(
        'digit-spinner: direction must be "forward", "backward", or "shortest"',
        `direction provided: ${changedProperties.get('direction')}`
      );
      return false;
    }

    return true;
  }

  override render() {
    const str = String(this.value);
    // pad with leading zeros
    const count = Math.max(str.length, this.minDigits);
    const padded = str.padStart(count, '0');
    const digits = Array.from(padded, (ch) => Number(ch));
    return html`
      <div class="container" part="container">
        ${repeat(
          digits,
          (_digit, idx) => idx,
          (digit, idx) => {
            const exportParts = DigitSpinner._getPartsByDigitIndex(digits, idx);
            return html`
              <spinning-digit
                .value=${digit}
                .direction=${this.direction}
                .duration=${this.duration}
                .easing=${this.easing}
                exportparts=${exportParts.join(',')}
              ></spinning-digit>
            `;
          }
        )}
      </div>
    `;
  }

  /**
   * Increment the spinner value by `num`
   * @param {number} num Number of digits to increment
   */
  public increment(num = 1): void {
    this.value = this.value + num;
  }

  /**
   * Decrement the spinner value by `num`
   * @param {number} num Number of digits to decrement
   */
  public decrement(num = 1): void {
    this.value = this.value - num;
  }

  private static _getPartsByDigitIndex(
    digits: number[],
    index: number
  ): string[] {
    const exportParts = ['digit'];
    if (index === 0) {
      exportParts.push(
        'digit:first-digit',
        'digit-wrapper:first-digit-wrapper'
      );
    }
    if (index === digits.length - 1) {
      exportParts.push('digit:last-digit', 'digit-wrapper:last-digit-wrapper');
    }
    return exportParts;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'digit-spinner': DigitSpinner;
  }
}
