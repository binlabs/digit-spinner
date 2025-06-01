import {Direction} from '..';

// DigitAnimationEvent.ts
export type DigitAnimationEventName =
  | 'digit-flip-start'
  | 'digit-flip-end'
  | 'digit-wrap';

export class DigitAnimationEvent extends Event {
  /** what the digit was before this flip */
  public readonly from: number;
  /** what the digit is after this flip */
  public readonly to: number;
  /** the direction of the wrap */
  public readonly direction?: Exclude<Direction, 'shortest'>;

  constructor(
    type: DigitAnimationEventName,
    from: number,
    to: number,
    direction?: Exclude<Direction, 'shortest'>
  ) {
    super(type, {bubbles: true, composed: true});
    this.from = from;
    this.to = to;
    this.direction = direction;
  }
}

export default DigitAnimationEvent;
