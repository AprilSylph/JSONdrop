import jsondrop from '../dist/jsondrop.min.js';

window.preview = (inputValue, config) => document.body.replaceChildren(jsondrop(inputValue, config));

window.addEventListener('load', () => {
  try {
    const params = (new URL(location)).searchParams;
    const object = params.get('inputValue') || params.get('object');
    const config = params.get('config') || '{}';
    if (object !== null) {
      window.preview(JSON.parse(object), JSON.parse(config));
    }
  } catch (exception) {
    console.error(exception);
    const object = { [exception.name]: exception.message };
    window.preview(object, { autoOpenDepth: 1 });
  }
});
