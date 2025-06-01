import {css} from 'lit';

export const styles = [
  css`
    :host {
      --digit-font-size: var(--spinner-font-size, 3rem);
      align-items: center;
      background: var(--digit-background, rgba(33, 39, 46, 255));
      border-radius: var(--digit-border-radius, 0.25rem);
      box-shadow: var(
        --digit-box-shadow,
        0 0.725em 0.1em -0.1em rgba(210, 210, 210, 0.125) inset
      );
      color: var(--digit-color, #fff);
      display: flex;
      height: var(--digit-font-size);
      justify-content: center;
      margin: 0;
      overflow: hidden;
      padding: calc(var(--digit-font-size) / 12);
    }

    .digit-wrapper {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;
      padding: 0;
      position: relative;
      top: calc(-1 * var(--digit-font-size) / 2);
    }

    .digit {
      align-items: center;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      font-size: var(--digit-font-size);
      height: var(--digit-font-size);
      justify-content: center;
      margin: 0;
      padding: 0;
      text-shadow: var(--digit-text-shadow, none);
      user-select: none;
      width: var(--digit-font-size);
      will-change: transform;
    }
  `,
];
