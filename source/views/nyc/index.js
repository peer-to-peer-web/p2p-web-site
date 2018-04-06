var objectKeys = require('object-keys')
var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var Rsvp = require('../../components/form-rsvp')
var header = require('../../components/header')
var format = require('../../components/format')
var footer = require('../../components/footer')
var NycHeader = require('./header')

var rsvp = new Rsvp()
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
        <div class="p2 fs1 co0 sm-co2 sm-c8 psr z3">
          ${rsvp.render({
            event: 'nyc'
          })}
        </div>
        <div class="p2 lh1-25 nyc-copy">
          ${format(active.text)}
        </div>
      </div>
      ${footer()}
    </div>
  `
}
