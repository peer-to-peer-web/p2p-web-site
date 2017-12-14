var html = require('choo/html')

module.exports = livestream

function livestream (props) {
  return html`
    <div class="psr c12 vh100">
      <iframe
        src="https://player.twitch.tv/?channel=jondashkyle"
        frameborder="0"
        allowfullscreen="true"
        scrolling="no"
        class="psa t0 l0 r0 b0 h100 w100"
      ></iframe>>
    </div>
  `
}
