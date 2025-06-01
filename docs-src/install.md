---
layout: page.11ty.cjs
title: <digit-spinner> ⌲ Install
---

# Install

`<digit-spinner>` is distributed on npm, so you can install it locally or use it via npm CDNs like unpkg.com.

## Local Installation

```bash
npm i digit-spinner
```

### Usage

Import the element and then use it in your HTML:

```html
<script type="module" src="node_modules/digit-spinner/dist/index.js"></script>

<digit-spinner value="42"></digit-spinner>
```

## CDN

npm CDNs like [unpkg.com]() can directly serve files that have been published to npm. This works great for standard JavaScript modules that the browser can load natively.

For this element to work from unpkg.com specifically, you need to include the `?module` query parameter, which tells unpkg.com to rewrite "bare" module specifiers to full URLs.

### HTML

```html
<script type="module" src="https://unpkg.com/digit-spinner?module"></script>

<digit-spinner value="42"></digit-spinner>
```

### JavaScript

```html
import 'https://unpkg.com/digit-spinner?module';

<digit-spinner value="42"></digit-spinner>
```
