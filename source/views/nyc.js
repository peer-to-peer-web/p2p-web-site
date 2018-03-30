var objectKeys = require('object-keys')
var html = require('choo/html')
var css = require('sheetify')

var wrapper = require('../components/wrapper')
var format = require('../components/format')

var container = css`
  :host .nyc-copy > *:not(:first-child) { margin-top: 1.5rem }
  :host .nyc-copy > *:not(:last-child) { margin-bottom: 1.5rem }
`

var header = css`
  :host {
    object-fit: contain;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    margin: 2rem;
    height: calc(100vh - 4rem);
    width: calc(100vw - 4rem);
  }

  @keyframes nycimg {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
`

var TITLE = 'Peer-to-Peer Web / NYC'

module.exports = wrapper(view)

function view (state, emit) {
  var page = state.content['/03-nyc']

  if (!state.title === TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div
      class="${container} w100 vhmn100 bgc-black fc-white tac fs2 sm-fsvw6"
      style="font-smooth: never; -webkit-font-smoothing : none;"
    >
      <img
        class="db psf t0 l0 ${header}"
        src="/content/03-nyc/img2.png"
      />
      <div
        class="oh psr lh1-25 x xjc xac vhmn100 tac"
        style="font-size: 14vw;"
      >
        <div class="psr z2" style="mix-blend-mode: difference;">
          Peer-to-Peer<br>Web / NYC
        </div>
      </div>
      <div class="p2 lh1-25 nyc-copy" style="mix-blend-mode: difference;">
        ${format(page.text)}
      </div>
    </div>
  `
}
