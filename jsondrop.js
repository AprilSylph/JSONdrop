/* https://github.com/AprilSylph/JSONdrop */

const defaultConfig = {
	autoOpenDepth: 0,
}

/**
 * Renders a JavaScript object into a pretty HTML JSON-esque representation.
 * @param {*} value - The value to be rendered. Non-standard objects will only render their object
 *					  type as a string.
 * @param {Object} [config] - The formatter configuration to use.
 * @param {number} [config.autoOpenDepth] - automatically expand values up to this depth
 * @returns {string} Usable HTML representation of the provided JSON.
 */
const render = (value, config) => translate(null, value, Object.assign({}, defaultConfig, config));

/**
 * Translates a key/value pair into HTML. Co-recursive with `list` and `expand`
 * @param {*} name - The key, if your value has one. Otherwise, anything falsy to render a keyless
					 value.
 * @param {*} value - The value to be rendered. Non-standard objects will only render their object
 *					  type as a string.
 * @param {Object} config - The formatter configuration to use.
 * @param {number} config.autoOpenDepth - automatically expand values up to this depth
 * @param {Object} [state] - The state of the formatter at a given call-site.
 * @param {Object} [state.depth] - the depth of the current value in the context of the full render
 * @returns {string} Usable HTML representation of the provided JSON.
 */
function translate(name, value, config, {depth = 0} = {}) {
	const nameOutput = (name ? `<span class="string">"${name}"</span>:` : "<span></span>");
	const open = (depth < config.autoOpenDepth ? "open" : "");

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
				return `<details ${open} class="array">
							<summary>${nameOutput}</summary>
							${list(value, config, {depth})}
						</details>`;
			} else if (value.toString() == "[object Object]") {
				return `<details ${open} class="object">
					<summary>${nameOutput}</summary>
						${expand(value, config, {depth})}
					</details>`;
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
function list(values, config, {depth}) {
	var html = "";
	for (let x of values) {
		html += translate("", x, config, {depth: depth + 1});
	}
	return html;
}

/**
 * Cycles through an object of key/value pairs to render each pair.
 * @param {Object} values - An object to be rendered.
 * @returns {string} Inner HTML representation of the provided object.
 */
function expand(values, config, {depth}) {
	var html = "";
	Object.entries(values).forEach(([key, value]) => html += translate(key, value, config, {depth: depth + 1}));
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
