import convert from '../src/jsondrop.js';

window.preview = (value, config) => {
  document.body.innerHTML = '';
  document.body.appendChild(convert(value, config));
};

window.addEventListener('load', () => {
  try {
    const params = (new URL(location)).searchParams;
    const object = params.get('object');
    if (object !== null) {
      window.preview(JSON.parse(object), JSON.parse(params.get('config')));
    }
  } catch (error) {
    const object = {};
    object[error.name] = error.message;
    window.preview(object, { autoOpenDepth: 1 });
  }
});
