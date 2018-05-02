var objectValues = require('object-values')
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
      <div class="${container} w100 vhmn100 bgc-black fc-white">
        ${nycHeader.render(state, emit, {
          markings: markings
        })}
        <div class="w100 sm-psa l0 b0 r0 z3 p-05" style="mix-blend-mode: difference">
          <div class="x xw mxa mxwidth">
            <ul class="c12 sm-c6 p0-5">
              <li class="">${active.time}</li>
              <li class="external"><a href="${active.locationhref}" target="_blank">${active.location}</a></div>
              <li class="external"><a href="${active.addresshref}" target="_blank">${active.address}</a></div>
            </ul>
            <ul class="c12 sm-c3 p0-5">
              ${objectValues(active.speakers).map(function (speaker) {
                return html`<li class="external"><a href="${speaker.href}">${speaker.name}</a></li>`
              })}
            </ul>
            <ul class="c12 sm-c3 p0-5">
              ${active.tags.map(function (tag) {
                return html`<li class="ti1">#${tag}</li>`
              })}
            </ul>
          </div>
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
