var html = require('choo/html')

module.exports = livestream

function livestream (state) {
  if (!state.ui.livestream) return ''
    
  return html`
    <div class="psr c12 vh100 bgc-black">
      <iframe
        src="https://player.vimeo.com/video/254950313"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
        class="psa t0 l0 r0 b0 h100 w100"
      ></iframe>>
    </div>
  `
}
