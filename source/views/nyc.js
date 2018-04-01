var objectKeys = require('object-keys')
var html = require('choo/html')
var css = require('sheetify')

var Rsvp = require('../components/form-rsvp')
var header = require('../components/header')
var format = require('../components/format')
var footer = require('../components/footer')

var rsvp = new Rsvp()

var container = css`
  :host {
    font-smoothing: never;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
  }

  :host .nyc-copy {
    mix-blend-mode: difference;
    position: relative;
    z-index: 2;
  }

  :host .nyc-copy > *:not(:first-child) { margin-top: 1.5rem }
  :host .nyc-copy > *:not(:last-child) { margin-bottom: 1.5rem }

  :host .nyc-title {
    overflow: hidden;
    white-space: nowrap;
    width: 100vw;
  }

  :host .nyc-title > div {
    width: 100vw;
  }

  :host .nyc-title > div > div {
    display: flex;
    width: 200vw;
  }

  :host .nyc-title > div > div > div {
    width: 100vw;
  }
  
  :host .nyc-title > div > div:nth-child(1) {
    animation: nyctitle 30s linear infinite;
  }

  :host .nyc-title > div > div:nth-child(2) {
    animation: nyctitle 30s linear infinite reverse;
  }

  @keyframes nyctitle {
    0% { transform: translate3d(0, 0, 0) }
    100% { transform: translate3d(-100vw, 0, 0) }
  }
`

var styleHeader = css`
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

module.exports = view

function view (state, emit) {
  var page = state.content['/nyc/2018-05-26']

  if (!state.title === TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div>
      <div class="fc-white psa t0 l0 r0 z3">
        ${header(state, emit)}
      </div>
      <div
        class="${container} w100 vhmn100 pb3 bgc-black fc-white tac fs2 sm-fsvw6"
        style=""
      >
        <img
          class="db psf t0 l0 ${styleHeader}"
          src="/content/nyc/2018-05-26/img2.png"
        />
        <div
          class="nyc-title x xac psr lh1-25 vh100 tac"
          style="mix-blend-mode: difference; font-size: 16vw;"
        >
          <div>
            <div>
              <div>Peer-to-Peer</div>
              <div>Peer-to-Peer</div>
            </div>
            <div>
              <div>Web / NYC</div>
              <div>Web / NYC</div>
            </div>
          </div>
        </div>
        <div class="p2 lh1-25 nyc-copy" style="margin-top: -1.25em">
          ${format(page.meta)}
        </div>
        <div class="p2 fs1 co0 sm-co2 sm-c8">
          ${rsvp.render({
            event: 'nyc'
          })}
        </div>
        <div class="p2 lh1-25 nyc-copy">
          ${format(page.text)}
        </div>
      </div>
      ${footer()}
    </div>
  `
}
