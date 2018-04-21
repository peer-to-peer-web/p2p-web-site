var html = require('choo/html')
var css = require('sheetify')

var Form = require('../components/form-mailinglist')
var header = require('../components/header')
var footer = require('../components/footer')
var libEvents = require('../lib/events')
var form = new Form()

var TITLE = 'Peer-to-Peer Web'

var styles = css`
  :host .home-about {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -2rem;
    transform: rotate(10deg);
  }

  @media (min-width: 767px) {
    :host .city:hover {
      filter: invert(1);
    }
  }
`

var entries = [
  {
    title: 'One',
    text: 'this is some text'
  },
  {
    title: 'Two',
    text: 'hwat up'
  },
  {
    title: 'Three',
    text: 'nice 1'
  },
  {
    title: 'Four',
    text: 'this is some text'
  },
]

module.exports = view

function view (state, emit) {
  var page = state.page
  var children = page('/')
    .children()
    .sortBy('title', 'asc')
    .toArray()
    .filter(isVisible)

  if (!state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div class="${styles}">
      <div class="vhmn100 x xdc">
        <div>
          ${header(state, emit)}
        </div>
        <div class="x xw">
          ${createAbout()}
          ${createSubscribe()}
        </div>
        <div class="xx x xdc tac">
          ${children.map(createChild)}
        </div>
      </div>
      ${footer(state, emit)}
    </div>
  `

  function createAbout () {
    var text = state.page('/about').value('texten') || ''
    return html`
      <a href="/about" class="db c6 psr bgc-black fc-white">
        <div class="home-about">
          ${text}
        </div>
      </a>
    `
  }

  function createSubscribe () {
    var subscribe = page('/about')
    return html`
      <div class="c6 p1 psr">
        <img src="/assets/list-bg.png" class="pixelate psa t0 l0 r0 b0 pen">
        ${state
          .cache(Form, 'home-list')
          .render()
        }
      </div>
    `
  }

  function createEntry (props) {

  }

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
