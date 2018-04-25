var objectKeys = require('object-keys')
var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

var format = require('../../../components/format')
var FormRsvp = require('../../../components/form-rsvp')
var navigation = require('../../../components/navigation')
var Video = require('../../../components/video-two')
var footer = require('../../../components/footer')
var header = require('../../../components/header')
var LaHeader = require('./header')

var laHeader = new LaHeader()
var formRsvp = new FormRsvp()
var video = new Video()

var TITLE = 'Peer-to-Peer Web / Los Angeles'

var styles = css`
  :host .la2-header { min-height: 100vh }
  :host .la2-poster { height: calc(100vh - 3rem) }
  :host .la2-poster img { object-fit: contain }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)

  if (state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div class="x xdc xjb vhmn100 ${styles}">
      <div class="la2-header oh x xdc xje xx p1 psr sm-fs2 img-grid fc-white">
        <div class="psa t0 l0 r0 z3">
          ${header(state, emit)}
        </div>
        ${laHeader.render({
          imageOld: page().file('street1.png').v('path'),
          imageNew: page().file('street2.png').v('path')
        })}
        <div class="psr fs2 fc-white lh1-25 pen">
          <span class="pea">
            ${page().v('title')} @ 11:30am–3pm<br>
            <a href="https://duckduckgo.com/?q=1031+N.+Broadway+los+angeles&t=ffab&ia=maps&iaxm=maps">1031 N. Broadway</a> (<a href="https://folder.studio/building-block" target="_blank">Folder Studio</a>)
          </span>
        </div>
      </div>
      <div class="x xx xw c12 p0-5 mxwidth" style="margin: 0 auto;">
        <div class="c12 sm-c6 p0-5 copy copy-simple">
          ${format(page().value('text'))}
        </div>
        <div class="c12 sm-c6 p0-5">
          <div class="psst" style="top: 1rem">
            ${formRsvp.render({ event: 'los-angeles-2' })}
          </div>
        </div>
      </div>
      <a href="https://folder.studio" class="db bgc-black psr la2-poster">
        <img
          src="${page().file('ig-poster.jpg').v('path')}"
          class="psa t0 l0 r0 b0 h100 w100"
        >
        <div class="pen psa z2 b0 l0 p1 fc-white">
          Limited edition risograph<br>print by Folder Studio →
        </div>
      </a>
      ${footer()}
    </div>
  `
}
