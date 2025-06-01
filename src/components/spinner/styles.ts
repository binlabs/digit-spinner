import {css} from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    background: var(--spinner-background, rgba(14, 19, 23, 255));
    border: var(--spinner-border-width, 0.25em) solid
      var(--spinner-border-color, rgba(33, 39, 46, 255));
    border-radius: var(--spinner-border-radius, 0.5rem);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    font-family: var(
      --spinner-font-family,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Helvetica,
      Arial,
      sans-serif
    );
    font-size: var(--spinner-font-size, 3rem);
    line-height: 1;
    padding: var(--spinner-padding, calc(var(--spinner-font-size, 3rem) / 12));
  }

  .container {
    display: inline-flex;
    vertical-align: top;
    gap: 0 var(--digit-spacing, 0.1em);
  }
`;
