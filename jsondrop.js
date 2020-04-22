/* https://github.com/AprilSylph/JSONdrop */

const defaultConfig = {
  autoOpenDepth: 0,
};

const getValueFromKDS = (obj, keyDotString) => {
  const path = keyDotString.split('.');
  path.forEach(key => obj = obj[key]);
  return obj;
};

const escapeHTML = string => Object.assign(
  document.createElement('p'),
  { innerText: string },
).innerHTML;

const translate = (name, value, keyDotString, isOpen) => {
  const isArray = Array.isArray(value);
  const isArrayValue = name == parseInt(name); // eslint-disable-line eqeqeq
  const id = keyDotString ? `id="${keyDotString}"` : 'data-jsondrop-root';
  const open = isOpen ? 'open' : '';
  const nameOutput = (name && !isArrayValue) ? `<span class="string">"${escapeHTML(name)}"</span>:` : '<span></span>';

  switch (typeof(value)) {
    case 'undefined':
    case 'boolean':
    case 'number':
    case 'string':
      return `<p>${nameOutput} <span class="${typeof(value)}">${escapeHTML(JSON.stringify(value))}</span></p>`;
    case 'function':
      return `<p>${nameOutput} <span class="function">${escapeHTML(value.toString())}</span></p>`;
    case 'object':
      if (value === null) {
        return `<p>${nameOutput} <span class="null">${value}</span></p>`;
      }

      if (isArray || value === Object(value)) {
        return `
          <details ${id} class="${isArray ? 'array' : 'object'}" ${open}>
            <summary>${nameOutput}</summary>
          </details>`;
      }

      return `
        <details class="object" ${open}>
          <summary>${nameOutput}</summary>
          <p>${JSON.stringify(value)}</p>
        </details>`;
  }
};

// eslint-disable-next-line no-unused-vars
const convert = (obj, config = {}) => {
  try {
    JSON.stringify(obj);
    Object.freeze(obj);
  } catch (error) {
    console.error(error);
    obj = {};
    obj[error.name] = error.message;
  }

  let depth = 0;
  const options = Object.assign({}, defaultConfig, config);
  const elementObject = Object.assign(document.createElement('code'), {
    className: 'jsondrop',
    innerHTML: translate(null, obj, false, depth < options.autoOpenDepth),
  });

  if (obj !== Object(obj)) {
    return elementObject;
  }

  let keyList = Object.keys(obj);

  do {
    depth++;

    let newKeyList = [];
    const autoOpen = depth < options.autoOpenDepth;

    keyList.forEach(key => {
      const item = getValueFromKDS(obj, key);

      if (item === Object(item)) {
        newKeyList = newKeyList.concat(Object.keys(item).map(x => `${key}.${x}`));
      }

      const keyArray = key.split('.');
      const valueName = keyArray.pop();
      const targetKey = keyArray.join('.');
      const selector = targetKey ? `[id="${targetKey}"]` : '[data-jsondrop-root]';
      const target = elementObject.querySelector(selector);

      target.innerHTML += translate(valueName, item, key, autoOpen);
    });

    keyList = newKeyList;
  } while (keyList.length !== 0);

  return elementObject;
};
