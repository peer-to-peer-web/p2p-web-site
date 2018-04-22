var html = require('choo/html')
var css = require('sheetify')

var Form = require('../components/form-mailinglist')
var header = require('../components/header')
var footer = require('../components/footer')
var format = require('../components/format')
var libEvents = require('../lib/events')
var form = new Form()

var TITLE = 'Peer-to-Peer Web'

var styles = css`
  :host .home-about {
    min-height: 8rem;
  }

  :host .home-about > div:nth-child(1) {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -2rem;
    transform: rotate(10deg);
    z-index: 2;
  }

  :host .home-entry {
    margin-right: -1px;
  }

  :host .home-entry {
    border-right: 1px solid #000;
  }

  @media (min-width: 767px) {
    :host .city:hover {
      filter: invert(1);
    }
  }

  @media (max-width: 767px) {
    :host .home-entry {
      border-right: 0;
      border-bottom: 1px solid #000;
    }

    :host .home-entry:last-child {
      border-bottom: 0;
    }
  }
`

module.exports = view

function view (state, emit) {
  var page = state.page
  var children = page('/')
    .children()
    .sortBy('title', 'asc')
    .toArray()
    .filter(isVisible)
  var entries = page('/log')
    .pages()
    .sortBy('date', 'desc')
    .toArray()
    .slice(0, 4)

  if (!state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div class="${styles}">
      <div class="vhmn100 x xdc">
        <div class="c12">
          ${header(state, emit)}
        </div>
        <div class="x xw c12">
          ${createAbout()}
          ${createSubscribe()}
        </div>
        <div class="c12">
          <div class="mxa mxwidth c12 oh home-entries">
            <div class="lh1 c12 p1 x xw xjb">
              <div>Recent Updates</div>
              <div><a href="/log">View all</a> →</div>
            </div>
            <div class="bb1-black mx1 sm-mb1"></div>
            <div class="x xw px1 py0 sm-pb1 sm-px0 w100">
              ${entries
                .map(createEntry)
                .reduce(function(res, cur, i, src) {
                  res.push(cur)
                  if (i % 2 && i !== src.length - 1) {
                    res.push(html`<div class="w100 m1 bb1-black dn sm-db"></div>`)
                  }
                  return res
                }, [ ])
              }
            </div>
          </div>
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
      <a href="/about" class="home-about oh db c12 sm-c6 psr bgc-black fc-white">
        <div>${text}</div>
        <div class="dn psa t0 l0 r0 b0 x xjc xac fs4">About</div>
      </a>
    `
  }

  function createSubscribe () {
    var subscribe = page('/about')
    return html`
      <div class="c12 sm-c6 p1 psr oh">
        <img src="/assets/list-bg.png" class="pixelate psa t0 l0 r0 b0 ofc h100 w100 pen">
        ${state
          .cache(Form, 'home-list')
          .render()
        }
      </div>
    `
  }

  function createEntry (props) {
    var max = 280
    var text = (props.text || '').split('\n')[0]
    var shouldTruncate = false
    text = `<span class="ff-mono">${props.date.split('-').splice(1, 2).join('/')}</span> — ` + text

    if (text.length > max) {
      shouldTruncate = true
      text = text.substring(0, max).trim()
      text += '… Continue reading →'
    }

    return html`
      <a
        href="${props.url}"
        class="db c12 sm-xx py1 sm-px1 sm-py0 home-entry"
      >${format(text)}</a>
    `
  }

  function createChild (props) {
    var image = page(props).files().first().value()
    var children = page(props).pages().visible().value()
    var previous = libEvents.previous(children).length
    var upcoming = libEvents.upcoming(children).length

    return html`
      <div class="x xjc xac xx psr px1 py4 lh1 city img-grid vhmn25" id="${props.name}">
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
      ? props.view === 'city' && props.private !== true
      : props.view === 'city' && props.visible !== false && props.private !== false
  }
}
