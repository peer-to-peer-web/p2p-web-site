var html = require('choo/html')

module.exports = footer

function footer (props) {
  props = props || { }
  var colors = props.invert ? 'bgc-black fc-white' : 'bgc-white fc-black'
  return html`
    <div class="fs1 c12 x xjc ${colors} p0-5">
      <div class="p0-5">
        ← <a href="/" class="pb0-25">Index</a>
      </div>
    </div>
  `
}