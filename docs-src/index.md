---
layout: page.11ty.cjs
title: <digit-spinner> ⌲ Home
---

# &lt;digit-spinner>

A digit spinning (e.g. odometer) web component built with Lit in TypeScript.

## Basic usage

<section class="columns">
  <div>

`<digit-spinner>` can be used in plain HTML - just set the `value` attribute to the desired value.

```html
<digit-spinner value="8675309"></digit-spinner>
```

  </div>
  <div>

<digit-spinner value="8675309"></digit-spinner>

  </div>
</section>

## Configure with attributes

<section class="columns">
  <div>

Set a minimum number of digits to pad with leading zeros using the `min-digits` attribute. By default, the spinner will display the number of digits necessary to display the value.

```html
<digit-spinner value="42" min-digits="4"></digit-spinner>
```

  </div>
  <div>

<digit-spinner value="42" min-digits="4"></digit-spinner>

  </div>
</section>

## Easy sizing

<section class="columns">
  <div>

The entire spinner is based on the font-size of the digit. Adjust `--spinner-font-size` and the rest will take care of itself!

```html
<style>
  digit-spinner {
    --spinner-font-size: 2rem;
  }
</style>
<digit-spinner value="42069"></digit-spinner>
```

  </div>
  <div>

<digit-spinner value="42069" style="--spinner-font-size: 2rem;"></digit-spinner>

  </div>
</section>
