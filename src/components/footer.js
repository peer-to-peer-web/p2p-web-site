var html = require('choo/html')

module.exports = footer

function footer (props) {
  props = props || { }
  var colors = props.invert ? 'bgc-black fc-white' : 'bgc-white fc-black'
  return html`
    <div class="fs1 c12 x xjc ${colors} p0-5">
      <div class="p0-5">
        <span class="psr lh1-25"><span class="psa t0" style="left: -2rem">←</span><a href="/" class="pb0-25">Index</a></span>
      </div>
    </div>
  `
}