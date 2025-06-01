const relative = require('./relative-path.cjs');

module.exports = function ({page}) {
  return `
<nav>
  <a href="${relative(page.url, '/')}">Home</a>
  <a href="${relative(page.url, '/playground/')}">Playground</a>
  <a href="${relative(page.url, '/api/')}">Documentation</a>
  <a href="${relative(page.url, '/install/')}">Install</a>
</nav>`;
};
