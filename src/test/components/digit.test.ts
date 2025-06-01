import {assert, fixture, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../../components/digit/digit.js';
import {SpinningDigit} from '../../components/digit/digit.js';
import DigitAnimationEvent from '../../events/digit-animation.js';

suite('spinning-digit', () => {
  test('is defined', () => {
    const el = document.createElement('spinning-digit');
    assert.instanceOf(el, HTMLElement);
  });

  test('renders ten digits (0–9)', async () => {
    const el = await fixture(html`<spinning-digit></spinning-digit>`);
    const digits = el.shadowRoot!.querySelectorAll('.digit');
    assert.equal(
      digits.length,
      10,
      'should render exactly ten .digit elements'
    );
    const texts = Array.from(digits).map((d) => d.textContent?.trim());
    assert.deepEqual(
      texts,
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      'digits should contain 0–9 in order'
    );
  });

  test('reflects attribute to property', async () => {
    const el = await fixture(html`<spinning-digit value="3"></spinning-digit>`);
    assert.equal((el as SpinningDigit).value, 3);
  });

  test('shift() wraps correctly', () => {
    const el: any = document.createElement('spinning-digit');
    assert.equal(el._shift(10), 0, 'shift(10) → 0');
    assert.equal(el._shift(-1), 9, 'shift(-1) → 9');
    assert.equal(el._shift(5), 5, 'shift(5) → 5');
  });

  test('fires digit-flip-start and digit-flip-end events', async () => {
    const el = await fixture(html`<spinning-digit value="1"></spinning-digit>`);

    setTimeout(() => (el as SpinningDigit).increment(), 1000);

    const {from: startFrom, to: startTo} = (await oneEvent(
      el,
      'digit-flip-start'
    )) as DigitAnimationEvent;
    assert.equal(startFrom, 1);
    assert.equal(startTo, 2);

    const {from: endFrom, to: endTo} = (await oneEvent(
      el,
      'digit-flip-end'
    )) as DigitAnimationEvent;
    assert.equal(endFrom, 1);
    assert.equal(endTo, 2);

    assert.equal((el as SpinningDigit).value, 2);
  });

  test('fires digit-wrap-forward event', async () => {
    const el = await fixture(html`<spinning-digit value="9"></spinning-digit>`);

    setTimeout(() => (el as SpinningDigit).increment(), 1000);

    const {from, to, direction} = (await oneEvent(
      el,
      'digit-wrap'
    )) as DigitAnimationEvent;
    assert.equal(from, 9);
    assert.equal(to, 0);
    assert.equal(direction, 'forward');

    assert.equal((el as SpinningDigit).value, 0);
  });

  test('fires digit-wrap-backward event', async () => {
    const el = await fixture(
      html`<spinning-digit value="0" direction="backward"></spinning-digit>`
    );

    setTimeout(() => (el as SpinningDigit).decrement(), 1000);

    const {from, to, direction} = (await oneEvent(
      el,
      'digit-wrap'
    )) as DigitAnimationEvent;
    assert.equal(from, 0);
    assert.equal(to, 9);
    assert.equal(direction, 'backward');

    assert.equal((el as SpinningDigit).value, 9);
  });
});
