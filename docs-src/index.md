---
layout: page.11ty.cjs
title: <digit-spinner> ⌲ Home
---

<section class="grid-layout">

<div class="column">

## Configure with attributes

`<digit-spinner>` can be used in plain HTML - just set the `value` attribute to your desired value. It can be futher configured with other attributes, such as `min-digits` to prepend leading zeros. See the [attributes table](api/#digit-spinner-attributes) for a full list of available attributes.

```html
<digit-spinner value="42" min-digits="6"></digit-spinner>
```

</div>

<div class="column centered">

<digit-spinner value="42" min-digits="6"></digit-spinner>

</div>

<div class="column">

## Easy theming

Use CSS variables to easily change the styling of both the spinner (the wrapping element) and the digits it contains. See the [CSS custom properties table](api/#digit-spinner-css-custom-properties) for a full list of available variables.

```html
<style>
  digit-spinner {
    --spinner-background: #ccc;
    --spinner-border-color: #efefef;
    --spinner-font-size: 4rem;
    --digit-background: #fff;
    --digit-box-shadow: 0 0.1em 0.1em rgba(0, 0, 0, 0.05) inset, 0 0 0 1px
        #bebebe;
    --digit-color: #313131;
  }
</style>

<digit-spinner value="14763"></digit-spinner>
```

</div>

<div class="column centered">

<digit-spinner value="14763" style="
    --spinner-background: #ccc;
    --spinner-border-color: #efefef;
    --spinner-font-size: 4rem;
    --digit-background: #fff;
    --digit-box-shadow: 0 0.1em 0.1em rgba(0, 0, 0, 0.05) inset, 0 0 0 1px #bebebe;
    --digit-color: #313131;
"></digit-spinner>

</div>

<div class="column">

## Simple sizing

The entire spinner is based on the font-size of the digit. Adjust `--spinner-font-size` and the rest will take care of itself!

```html
<digit-spinner
  value="1234567"
  style="--spinner-font-size: 2rem;"
></digit-spinner>
```

</div>

<div class="column centered">

<digit-spinner value="1234567" style="--spinner-font-size: 2rem;"></digit-spinner>

</div>
</section>
