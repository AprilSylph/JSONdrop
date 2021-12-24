/**
 * @param {string} string - String to test
 * @returns {boolean} True if the string can be interpreted as an absolute URL
 */
const isUrl = string => {
  try {
    return new URL(string) instanceof URL;
  } catch {
    return false;
  }
};

/**
 * @param {Array} entry - Object entry
 * @param {string} [entry.key] - Entry key
 * @param {*} entry.value - Entry value
 * @param {boolean} open - If this object or array should display expanded
 * @returns {HTMLParagraphElement|HTMLDetailsElement} The entry rendered as an Element
 */
const renderEntry = ([key, value], open) => {
  const paragraph = document.createElement('p');

  if (typeof key === 'string') {
    const keySpan = Object.assign(document.createElement('span'), { textContent: JSON.stringify(key) });
    keySpan.dataset.jsondropType = 'string';
    paragraph.append(keySpan, ': ');
  }

  switch (typeof value) {
    case 'function': {
      const valueSpan = Object.assign(document.createElement('span'), { textContent: value.toString() });
      valueSpan.dataset.jsondropType = 'function';
      paragraph.append(valueSpan);
      break;
    }
    case 'object': {
      if (value === null) {
        const valueSpan = Object.assign(document.createElement('span'), { textContent: JSON.stringify(value) });
        valueSpan.dataset.jsondropType = 'null';
        paragraph.append(valueSpan);
        break;
      }

      const details = Object.assign(document.createElement('details'), { open });
      details.dataset.jsondropType = Array.isArray(value) ? 'array' : 'object';

      const summary = Object.assign(document.createElement('summary'));
      summary.append(...paragraph.childNodes);
      details.append(summary);

      return details;
    }
    default: {
      const valueSpan = Object.assign(document.createElement('span'), { textContent: JSON.stringify(value) });
      valueSpan.dataset.jsondropType = typeof value;
      paragraph.append(valueSpan);

      if (isUrl(value)) {
        const anchor = Object.assign(document.createElement('a'), { href: value, target: '_blank' });
        anchor.append(...valueSpan.childNodes);
        valueSpan.append(anchor);
      }
    }
  }

  return paragraph;
};

/**
 * @param {*} obj - Object to render
 * @param {object} [config] - Configuration options
 * @param {number} [config.autoOpenDepth] - How deep to auto-expand objects (default: 0)
 * @returns {HTMLElement} A <code> element containing an interactive pretty-printed display of the input object
 */
export default (inputValue, config = {}) => {
  // Clone the input object to ensure the data is rendered as it was supplied
  if (typeof inputValue === 'object' && inputValue !== null) {
    inputValue = Array.isArray(inputValue) ? [...inputValue] : { ...inputValue };
  }

  // Throw if stringify throws to prevent attempting to render cyclical values
  JSON.stringify(inputValue);

  const {
    autoOpenDepth = 0
  } = config;

  const outputElement = Object.assign(document.createElement('code'), { className: 'jsondrop' });
  const renderedObject = renderEntry([null, inputValue], autoOpenDepth > 0);
  outputElement.append(renderedObject);

  if (inputValue !== Object(inputValue)) return outputElement;

  let renderStack = new Map([[renderedObject, inputValue]]);
  let depth = 1;

  while (renderStack.size > 0) {
    const open = depth < autoOpenDepth;
    const newRenderStack = new Map();

    for (const [targetElement, data] of renderStack) {
      Object.entries(data).forEach(([key, value]) => {
        const renderedEntry = renderEntry([Array.isArray(data) ? null : key, value], open);
        targetElement.append(renderedEntry);
        if (renderedEntry instanceof HTMLDetailsElement) newRenderStack.set(renderedEntry, value);
      });
    }

    renderStack = newRenderStack;
    depth++;
  }

  return outputElement;
};
