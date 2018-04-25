var html = require('choo/html')

module.exports = footer

function footer (props) {
  props = props || { }
  return html`
    <div class="w100 psr z3 fs1 c12 lh1 x xjb p0-5">
      <div class="p0-5 tac">
        <a href="/">Index</a>
      </div>
      <div class="p0-5 tar wsnw">
        <a href="/coc">Code of Conduct</a>
      </div>
    </div>
  `
}
