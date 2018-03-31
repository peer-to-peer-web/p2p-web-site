var html = require('choo/html')

var date = new Date()

module.exports = footer

function footer (props) {
  props = props || { }
  var colors = props.invert ? 'bgc-black fc-white' : 'bgc-white fc-black'
  return html`
    <div class="psr z3 fs1 c12 lh1-5 x ${colors} p0-5">
      <div class="p0-5 c4 ff-mono">
       ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}
      </div>
      <div class="c4 p0-5 tac">
        <a href="/">Index</a>
      </div>
      <div class="c4 p0-5 tar wsnw">
        <a href="/coc">Code of Conduct</a>
      </div>
    </div>
  `
}