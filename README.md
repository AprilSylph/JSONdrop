# JSONdrop
Javascript Object to HTML5 pretty-print converter

## About
JSONdrop is an experiment that converts Javascript objects into HTML. Any browser that supports `<details>` elements properly will display these converted objects as collapsed data with individually expandable entries.

### Preview
[Live preview site](https://aprilsylph.github.io/JSONdrop/preview/)

The preview site can accept an object to display (`object`) and a custom configuration object (`config`) as URL parameters. Naturally, both objects should be URI-encoded to avoid breakage.  

If the object cannot be parsed, it shall display an automatically-expanded object containing the error which was caught.

[View the `package.json` as rendered by JSONdrop](https://aprilsylph.github.io/JSONdrop/preview/?object={\%22name%22%3A%22JSONdrop%22%2C%22version%22%3A%222.0.2%22%2C%22description%22%3A%22Javascript%20Object%20to%20HTML5%20pretty-print%20converter%22%2C%22main%22%3A%22jsondrop.js%22%2C%22scripts%22%3A{\%22test%22%3A%22eslint%20.%2F%22}%2C%22repository%22%3A{\%22type%22%3A%22git%22%2C%22url%22%3A%22git%2Bhttps%3A%2F%2Fgithub.com%2FAprilSylph%2FJSONdrop.git%22}%2C%22keywords%22%3A[%22JSON%22]%2C%22author%22%3A%22April%20Sylph%22%2C%22license%22%3A%22GPL-3.0%22%2C%22bugs%22%3A{\%22url%22%3A%22https%3A%2F%2Fgithub.com%2FAprilSylph%2FJSONdrop%2Fissues%22}%2C%22homepage%22%3A%22https%3A%2F%2Fgithub.com%2FAprilSylph%2FJSONdrop%23readme%22%2C%22devDependencies%22%3A{\%22eslint%22%3A%22^6.8.0%22%2C%22minify%22%3A%22^5.1.1%22}}&config=%7B%22autoOpenDepth%22%3A1%7D)

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
