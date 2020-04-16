/* globals convert */
const preview = (value, config) => document.body.appendChild(convert(value, config));

window.addEventListener('load', () => {
  try {
    const params = (new URL(location)).searchParams;
    const object = params.get('object');
    if (object !== null) {
      preview(JSON.parse(object), JSON.parse(params.get('config')));
    }
  } catch (error) {
    preview({error}, {autoOpenDepth: 1});
  }
});
