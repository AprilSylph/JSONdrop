/**
 * Translates a key/value pair into HTML. Indirectly recursive.
 * @param {*} name - The key, if your value has one. Otherwise, anything falsy to render a keyless value.
 * @param {*} value - The value to be rendered. Non-standard objects will only render their object type as a string.
 * @returns {string} Usable HTML representation of the provided JSON.
 */
function translate(name, value) {
	const nameOutput = (name ? `<span class="string">"${name}"</span>:` : "");
	switch(typeof(value)) {
		case "undefined":
		case "boolean":
		case "number":
		case "function":
			return `<p>${nameOutput} <span class="${typeof(value)}">${value}</span></p>`;
		case "string":
			return `<p>${nameOutput} <span class="string">${escapeText(value)}</span></p>`;
		case "object":
			if (value === null) {
				return `<p>${nameOutput} <span class="null">${value}</span></p>`;
			} else if (Array.isArray(value)) {
				return `<details class="array"><summary>${nameOutput}</summary>${list(value)}</details>`;
			} else if (value.toString() == "[object Object]") {
				return `<details class="object"><summary>${nameOutput}</summary>${expand(value)}</details>`;
			} else {
				return `<p>${nameOutput} <span class="string">"${value}"</span></p>`;
			}
	}
}

/**
 * Cycles through an array to render each value.
 * @param {Object[]} values - An array to be rendered.
 * @returns {string} Inner HTML representation of the provided array.
 */
function list(values) {
	var html = "";
	for (let x of values) {
		html += translate("", x);
	}
	return html;
}

/**
 * Cycles through an object of key/value pairs to render each pair.
 * @param {Object} values - An object to be rendered.
 * @returns {string} Inner HTML representation of the provided object.
 */
function expand(values) {
	var html = "";
	Object.entries(values).forEach(([key, value]) => html += translate(key, value));
	return html;
}
/**
 * Makes strings safe to display within browsers.
 * @param {string} value - The text to be escaped.
 * @returns {string} The same text, displayable on a web page.
 */
function escapeText(value) {
	return JSON.stringify(value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
	);
}
