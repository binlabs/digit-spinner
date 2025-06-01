---
layout: example.11ty.cjs
title: <digit-spinner> ⌲ Examples ⌲ Theming
tags: example
name: Theming
description: Styling the spinner with a light theme
---

<style>
  digit-spinner {
    --spinner-background-color: rgba(226,218,210,255);
    --spinner-border-color: rgba(243,239,233,255);
    --digit-background-color: rgba(245,242,235,255);
    --digit-color: rgba(54,52,49,255);
  }
</style>

<digit-spinner value="14763"></digit-spinner>

<h3>CSS</h3>

```css
digit-spinner {
  --spinner-background-color: #fff;
  --spinner-border-color: #ccc;
  --digit-background-color: #f0f0f0;
  --digit-color: #333;
}
```

<h3>HTML</h3>

```html
<digit-spinner value="14763"></digit-spinner>
```
