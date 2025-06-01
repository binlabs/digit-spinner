import {assert, fixture, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../../components/spinner/spinner.js';
import {DigitSpinner} from '../../components/spinner/spinner.js';
import DigitAnimationEvent from '../../events/digit-animation.js';

suite('digit-spinner', () => {
  test('is defined', () => {
    const el = document.createElement('digit-spinner');
    assert.instanceOf(el, HTMLElement);
  });

  test('renders correct number of spinning-digit elements based on value and min-digits', async () => {
    const el = await fixture(
      html`<digit-spinner value="5" min-digits="3"></digit-spinner>`
    );
    const digits = el.shadowRoot!.querySelectorAll('spinning-digit');
    assert.equal(digits.length, 3);
    assert.equal((digits[0] as any).value, 0);
    assert.equal((digits[1] as any).value, 0);
    assert.equal((digits[2] as any).value, 5);
  });

  test('increment from 9 wraps and cascades to next digit', async () => {
    const el = await fixture(
      html`<digit-spinner
        value="9"
        min-digits="2"
        direction="forward"
        duration="100"
      ></digit-spinner>`
    );

    // Trigger a single-step increment that will wrap 9→0
    setTimeout(() => (el as DigitSpinner).increment(), 3000);

    // Wait for the wrap event from the least-significant digit
    const {from, to, direction} = (await oneEvent(
      el,
      'digit-wrap'
    )) as DigitAnimationEvent;

    assert.equal(from, 9);
    assert.equal(to, 0);
    assert.equal(direction, 'forward');

    // After wrap, spinner.value should be 10
    assert.equal((el as DigitSpinner).value, 10);

    // Verify child spinning-digit values: [1, 0]
    const digits = el.shadowRoot!.querySelectorAll('spinning-digit');
    assert.equal((digits[0] as any).value, 1);
    assert.equal((digits[1] as any).value, 0);
  });

  // Negative values are not supported yet
  test('decrement from 10 wraps and cascades to next digit', async () => {
    const el = await fixture(
      html`<digit-spinner
        value="10"
        min-digits="2"
        direction="backward"
      ></digit-spinner>`
    );

    // Trigger a single-step decrement that will wrap 0→9
    setTimeout(() => (el as DigitSpinner).decrement(), 3000);

    const digits = el.shadowRoot!.querySelectorAll('spinning-digit');

    // Wait for the wrap event from the s
    const {from, to, direction} = (await oneEvent(
      digits[1],
      'digit-wrap'
    )) as DigitAnimationEvent;

    // After wrap down, second digit should be 9
    assert.equal(from, 0);
    assert.equal(to, 9);
    assert.equal(direction, 'backward');

    // After wrap, spinner.value should be 9
    assert.equal((el as DigitSpinner).value, 9);

    // Verify child spinning-digit values: [0, 9]
    assert.equal((digits[0] as any).value, 0);
    assert.equal((digits[1] as any).value, 9);
  });
});
