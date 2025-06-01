import {live} from '../../node_modules/lit-html/directives/live.js';
import {html, render} from '../../node_modules/lit-html/lit-html.js';

// Component Defaults
let directionValueDefault = 'shortest';
let minDigitValueDefault = '0';
let animationDurationDefault = '200';
let fontSizeDefault = '3rem';
// State variables
let minDigitValue = '6';
let directionValue = directionValueDefault;
let inputValue = '1234';
let fontSizeValue = '5rem';
let animationDurationValue = '400';

const animationDurations = ['200', '400', '600', '800', '1000'];
const minDigits = ['0', '1', '2', '3', '4', '5', '6'];
const directions = ['forward', 'backward', 'shortest'];
const fontSizes = ['1rem', '2rem', '3rem', '4rem', '5rem', '6rem'];

// Handlers to update state and re-render
const updateMinDigits = (e) => {
  minDigitValue = e.target.value;
  update();
};
const updateDirection = (e) => {
  directionValue = e.target.value;
  update();
};
const updateValue = (e) => {
  inputValue = e.target.value;
  update();
};
const updateFontSize = (e) => {
  fontSizeValue = e.target.value;
  update();
};
const updateAnimationDuration = (e) => {
  animationDurationValue = e.target.value;
  update();
};
const decrement = () => {
  inputValue = (parseInt(inputValue) - 1).toString();
  update();
};
const increment = () => {
  inputValue = (parseInt(inputValue) + 1).toString();
  update();
};
const random = () => {
  const randomNum = (minDigitValue = 0) => {
    // Compute the maximum digits based on minDigitValue default behavior
    const maxDigits = minDigitValue === 0 ? 6 : minDigitValue;

    // Ensure at least 3 digits
    const min = 3;
    const digits = Math.floor(Math.random() * (maxDigits - min + 1)) + min;

    // Generate a random number with `digits` digits: range
    const lower = 10 ** (digits - 1);
    const upper = 10 ** digits - 1;
    const newValue = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    return newValue;
  };

  inputValue = randomNum(Number(minDigitValue)).toString();
  update();
};

const template = () => html`
  <div id="playground-container">
    <div id="playground-preview">
      <digit-spinner
        id="dynamic-spinner"
        class="dynamic"
        .direction=${directionValue}
        .duration=${Number(animationDurationValue)}
        .minDigits=${Number(minDigitValue)}
        .value=${Number(inputValue)}
        style="--spinner-font-size: ${fontSizeValue}"
      ></digit-spinner>
    </div>

    <div id="playground-code-output">
      <h2>Code Preview</h2>
      <pre><code>${codePreviewTemplate()}</code></pre>
    </div>

    <div id="playground-controls">
      <div
        role="group"
        aria-labelledby="spinner-value-label"
        class="control-group"
      >
        <span id="spinner-value-label" class="control-group__label">
          Spinner Value
        </span>
        <div class="control">
          <button
            class="btn btn-dark btn-decrement"
            type="button"
            @click=${decrement}
          >
            <span class="icon">-</span>
            <span class="label">Decrement</span>
          </button>
        </div>

        <div class="control">
          <button
            class="btn btn-dark btn-random"
            type="button"
            @click=${random}
          >
            <span class="icon">🎲</span>
            <span class="label">Random</span>
          </button>
        </div>

        <div class="control">
          <button
            class="btn btn-dark btn-increment"
            type="button"
            @click=${increment}
          >
            <span class="icon">+</span>
            <span class="label">Increment</span>
          </button>
        </div>
      </div>

      <div class="control">
        <label for="font-select">Font Size</label>
        <select
          id="font-select"
          class="form-select"
          @change=${updateFontSize}
          .value=${live(fontSizeValue)}
        >
          ${fontSizes.map(
            (size) =>
              html`<option value="${size}" ?selected=${size === fontSizeValue}>
                ${size}${size === fontSizeDefault ? ' (default)' : null}
              </option>`
          )}
        </select>
      </div>

      <div class="control">
        <label for="min-digits-select">Min. Digits</label>
        <select
          id="min-digits-select"
          class="form-select"
          @change=${updateMinDigits}
          .value=${live(minDigitValue)}
        >
          ${minDigits.map(
            (value) =>
              html`<option
                value="${value}"
                ?selected=${value === minDigitValue}
                ?disabled=${value !== '0' && inputValue.length > value}
              >
                ${value}${value === minDigitValueDefault ? ' (default)' : null}
              </option>`
          )}
        </select>
      </div>

      <div class="control">
        <label for="direction-select">Animation Direction</label>
        <select
          id="direction-select"
          class="form-select"
          @change=${updateDirection}
          .value=${live(directionValue)}
        >
          ${directions.map(
            (value) =>
              html`<option
                value="${value}"
                ?selected=${value === directionValue}
              >
                ${capitalizeFirstLetter(value)}${value === directionValueDefault
                  ? ' (default)'
                  : null}
              </option>`
          )}
        </select>
      </div>

      <div class="control">
        <label for="animation-duration">Animation Duration</label>
        <select
          id="animation-duration"
          class="form-select"
          @change=${updateAnimationDuration}
          .value=${live(animationDurationValue)}
        >
          ${animationDurations.map(
            (duration) =>
              html`<option
                value="${duration}"
                ?selected=${duration === animationDurationValue}
              >
                ${duration}ms${duration === animationDurationDefault
                  ? ' (default)'
                  : null}
              </option>`
          )}
        </select>
      </div>
    </div>
    <!-- #playground-controls -->
  </div>
  <!-- #playground-container -->
`;

// Capitalize first letter of string
const capitalizeFirstLetter = (s) => s[0].toUpperCase() + s.substring(1);

// Build array of attribute lines when they differ from defaults
const buildAttributeLines = () => {
  const lines = [];

  if (directionValue !== directionValueDefault) {
    lines.push(`direction=\"${directionValue}\"`);
  }
  if (Number(animationDurationValue) !== Number(animationDurationDefault)) {
    lines.push(`duration=\"${animationDurationValue}\"`);
  }
  if (Number(minDigitValue) !== Number(minDigitValueDefault)) {
    lines.push(`min-digits=\"${minDigitValue}\"`);
  }
  if (fontSizeValue !== fontSizeDefault) {
    lines.push(`style=\"--spinner-font-size: ${fontSizeValue}\"`);
  }

  // Always include value
  lines.push(`value=\"${inputValue}\"`);

  return lines;
};

const codePreviewTemplate = () => {
  const attrLines = buildAttributeLines();
  const newline = `\n`;
  const tab = `\t`;

  return html`
    &lt;digit-spinner${attrLines.map(
      (line) => html`${newline}${tab}${line}`
    )}&gt;
    &lt;/digit-spinner&gt;
  `;
};

// Render function
const update = () => {
  render(template(), document.getElementById('app'));
};

// Initial render
update();
