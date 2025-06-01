---
layout: example.11ty.cjs
title: <digit-spinner> ⌲ Examples ⌲ Theming
tags: example
name: Theming
description: Styling the spinner
---

<style>
  digit-spinner {
    --digit-color: cream;
  }
</style>

<digit-spinner value="42069"></digit-spinner>

<h3>CSS</h3>

```css
p {
  border: solid 1px blue;
  padding: 8px;
}
```

<h3>HTML</h3>

```html
<digit-spinner value="42069"></digit-spinner>
```
