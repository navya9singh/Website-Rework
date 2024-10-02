//const { htm } = require('htm/preact');
const  { html } = require('htm/preact');
const { h, render } = require('preact');

const LayoutDefault = require('./layoutDefault');

// module.exports = () => html`
//   <div>
//     <div class="App">
//       Hello World
//     </div>
//   </div>
// `;
module.exports = () => html`Hello Hello Hello World`;

// const sections = {
//   content: require('./SectionContent'),
//   hero: require('./SectionHero'),
//   teaser: require('./SectionTeaser'),
// };

//const html = htm.bind(h);

// function App (props) {
//   return html`<h1>Hello ${props.name}!</h1>`;
// }

// const data = render(html`<${App} name="World" />`, document.body);

// module.exports = data;