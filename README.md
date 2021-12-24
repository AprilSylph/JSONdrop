# JSONdrop
Javascript Object to HTML5 pretty-print converter

## About
JSONdrop is an experiment that converts Javascript objects into HTML. Any browser that supports `<details>` elements properly will display these converted objects as collapsed data with individually expandable entries.

### Preview
[Live preview site](https://aprilsylph.github.io/JSONdrop/preview/)

The preview site can accept an object to display (`object`) and a custom configuration object (`config`) as URL parameters. Naturally, both objects should be URI-encoded to avoid breakage.  

If the object cannot be parsed, it shall display an automatically-expanded object containing the error which was caught.

[View the `package.json` as rendered by JSONdrop](https://aprilsylph.github.io/JSONdrop/preview/?object=%7B%22license%22%3A%22GPL-3.0%22%2C%22repository%22%3A%22github%3AAprilSylph%2FJSONdrop%22%2C%22scripts%22%3A%7B%22test%22%3A%22eslint%20.%22%7D%2C%22devDependencies%22%3A%7B%22eslint%22%3A%22%5E7.32.0%22%2C%22eslint-config-semistandard%22%3A%22%5E16.0.0%22%2C%22eslint-config-standard%22%3A%22%5E16.0.3%22%2C%22eslint-plugin-import%22%3A%22%5E2.25.3%22%2C%22eslint-plugin-node%22%3A%22%5E11.1.0%22%2C%22eslint-plugin-promise%22%3A%22%5E5.2.0%22%2C%22minify%22%3A%22%5E5.1.1%22%7D%7D&config=%7B%22autoOpenDepth%22%3A1%7D)

### Usage
`jsondrop.js` defines `convert`, a function which takes two arguments:

1. The Javascript object to convert
2. A configuration object

and returns an `HTMLElement` object; a `<code class="jsondrop">` element.

If the input object is circular, or otherwise cannot be stringified, `convert` will return a conversion of the error that was caught when attempting to `JSON.stringify()` the input object.

`jsondrop.css` is required to display the converted JSON with its proper syntax.  
It also defines a default colour scheme via CSS variable fallbacks, allowing you to define your own colour scheme easily.

 - `--jsondrop-background` (default: `black`)
 - `--jsondrop-text` (default: `white`)
 - `--jsondrop-undefined` (default: `grey`)
 - `--jsondrop-null` (default: `grey`)
 - `--jsondrop-boolean` (default: `lime`)
 - `--jsondrop-number` (default: `lime`)
 - `--jsondrop-string` (default: `fuchsia`)
 - `--jsondrop-function` (default: `aqua`)
 
 Minified versions of `jsondrop.js` and `jsondrop.css` are available on the [Releases](https://github.com/AprilSylph/JSONdrop/releases/latest) page.
