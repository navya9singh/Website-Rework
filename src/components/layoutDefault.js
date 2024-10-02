const { html } = require('htm/preact');

module.exports = ({ children }) => html`
  <div class="LayoutDefault">
    <main>
      ${children}
    </main>
    <footer class="LayoutDefault__footer">
    </footer>
  </div>
`;