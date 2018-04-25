var objectKeys = require('object-keys')
var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var FormRsvp = require('../../components/form-rsvp')
var header = require('../../components/header')
var format = require('../../components/format')
var footer = require('../../components/footer')
var NycHeader = require('./header')

var nycHeader = new NycHeader()

var container = css`
  :host { }

  :host .nyc-copy {
    mix-blend-mode: difference;
    position: relative;
    z-index: 2;
  }

  :host .nyc-copy > *:not(:first-child) { margin-top: 1.5rem }
  :host .nyc-copy > *:not(:last-child) { margin-bottom: 1.5rem }

  :host .nyc-title {
    line-height: 1;
    overflow: hidden;
    white-space: nowrap;
  }
`

var TITLE = 'Peer-to-Peer Web / NYC'

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var active = state.content['/nyc/2018-05-26']
  var markings = page('/nyc/2018-05-26/markings').files().value()

  if (!state.title === TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div>
      <div class="fc-white psa t0 l0 r0 z3" style="mix-blend-mode: difference">
        ${header(state, emit)}
      </div>
      <div class="${container} w100 vhmn100 pb3 bgc-black fc-white tac fs2 sm-fsvw6">
        ${nycHeader.render(state, emit, {
          markings: markings
        })}
        <div class="p2 lh1-25 nyc-copy" style="margin-top: -1.25em">
          ${format(active.meta)}
        </div>
      </div>
      <div class="c12 p0-5 bgc-white psr z2">
        <div class="x xw mxa mxwidth">
          <div class="c12 sm-c6 p0-5 fc-black copy">
            ${page('/about').value('texten').split('\n')[0]}<a href="/about" class="ml0-5">Continue reading…</a>
          </div>
          <div class="c12 sm-c6 fs2 p0-5">
            ${state
              .cache(FormRsvp, 'nyc-rsvp')
              .render({ event: 'nyc' })
            }
          </div>
        </div>
      </div>
      <div class="bgc-black psr z2">
        ${footer()}
    </div>
  `
}
