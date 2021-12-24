# JSONdrop
Javascript Object to HTML5 pretty-print converter

## About
JSONdrop is an experiment that converts Javascript objects into HTML. Any browser that supports `<details>` elements properly will display these converted objects as collapsed data with individually expandable entries.

## Preview
[Live preview site](https://aprilsylph.github.io/JSONdrop/preview/) | [View the `package.json` as rendered by JSONdrop](https://aprilsylph.github.io/JSONdrop/preview/?object=%7B%22license%22%3A%22GPL-3.0%22%2C%22repository%22%3A%22github%3AAprilSylph%2FJSONdrop%22%2C%22scripts%22%3A%7B%22test%22%3A%22eslint%20.%22%7D%2C%22devDependencies%22%3A%7B%22eslint%22%3A%22%5E7.32.0%22%2C%22eslint-config-semistandard%22%3A%22%5E16.0.0%22%2C%22eslint-config-standard%22%3A%22%5E16.0.3%22%2C%22eslint-plugin-import%22%3A%22%5E2.25.3%22%2C%22eslint-plugin-node%22%3A%22%5E11.1.0%22%2C%22eslint-plugin-promise%22%3A%22%5E5.2.0%22%2C%22minify%22%3A%22%5E5.1.1%22%7D%7D&config=%7B%22autoOpenDepth%22%3A1%7D)

The preview site can accept an object to display (`object`) and a custom configuration object (`config`) as URL parameters. Naturally, both objects should be URI-encoded to avoid breakage.

If the object cannot be parsed, it shall display an automatically-expanded object containing the error which was caught.

## Syntax

`jsondrop.js` is an ES6 module which defines one method.

```js
let outputElement = jsondrop(inputValue, config);
```

### Parameters

**`inputValue`**  
The value to convert to HTML. Object properties must be own, enumerable, and string-keyed to be rendered.

**`config`**  
A configuration object. The following properties are supported:
- **`autoOpenDepth`** - `number` specifying how deep to automatically expand the object properties. Default: `0`

### Return value

`HTMLElement`. A `<code>` element displaying the data from the input object.

### Exceptions

- `TypeError` if **`inputValue`** has a circular reference or contains a `BigInt` value.

## Styling

`jsondrop.css` is required to display the rendered object with its proper syntax.  
It also defines a default colour scheme via CSS variable fallbacks, allowing you to define your own colour scheme easily.

- `--jsondrop-background` (default: `black`)
- `--jsondrop-text` (default: `white`)
- `--jsondrop-undefined` (default: `grey`)
- `--jsondrop-null` (default: `grey`)
- `--jsondrop-boolean` (default: `lime`)
- `--jsondrop-number` (default: `lime`)
- `--jsondrop-string` (default: `fuchsia`)
- `--jsondrop-function` (default: `aqua`)
