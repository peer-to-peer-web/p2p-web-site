var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')

var Form = require('../components/form-mailinglist')
var header = require('../components/header')
var libEvents = require('../lib/events')
var form = new Form()

var TITLE = 'Peer-to-Peer Web'

var styles = css`
  @media (min-width: 767px) {
    :host .city:hover {
      filter: invert(1);
    }
  }
`

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var children = page('/')
    .children()
    .sortBy('title', 'asc')
    .toArray()
    .filter(isVisible)

  if (!state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div class="vhmn100 x xdc ${styles}">
      <div>
        ${header(state, emit)}
      </div>
      <div class="xx x xdc tac">
        ${children.map(createChild)}
    </div>
  `

  function createChild (props) {
    var image = page(props).files().first().value()
    var children = page(props).pages().visible().value()
    var previous = libEvents.previous(children).length
    var upcoming = libEvents.upcoming(children).length

    return html`
      <div class="x xjc xac xx psr p1 lh1 city img-grid vhmn25" id="${props.name}">
        <a href="${props.url}" class="psa t0 l0 r0 b0 z3"></a>        
        <img
          src="${image.path}"
          class="psa t0 l0 r0 b0 h100 w100 pixelate"
          style="object-fit: cover;"
        >
        <div class="psr z2 x xdc xac">
          <div class="lh1 fs2 sm-fsvw6 bgc-black fc-white p0-5">
            ${props.title}
          </div>
          <div class="mt0-5 bgc-black fc-white p0-5 ff-mono">
            ${[
              previous ? previous + ' Previous' : '',
              upcoming ? upcoming + ' Upcoming' : ''
            ].filter(line => line).join(' / ')}
          </div>
        </div>
      </div>
    `
  }

  function isVisible (props) {
    return state.ui.dev
      ? props.private !== true
      : props.visible !== false && props.private !== false
  }
}
