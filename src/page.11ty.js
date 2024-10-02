const { html } = require('htm/preact');
const render = require('preact-render-to-string');

const App = require('./components/app');

module.exports = class Page {
  data() {
    return {
      title: 'Setting up Eleventy with Preact and htm',
      layout: 'playground.njk',
    };
  }

  render() {
    const output = render(html`<${App}/>`);
    console.log(output);
    return render(html`<${App}/>`);
  }
};