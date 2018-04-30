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
  :host .la2-header { min-height: 80vh }
  :host .la2-poster { height: calc(100vh - 3rem) }
  :host .la2-poster img { object-fit: contain }
`

module.exports = view

function view (state, emit) {
  var page = xtend(
    state.content['/los-angeles/2018-04-28'],
    state.custom['/los-angeles/2018-04-28']
  ) 

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
          imageOld: state.page().file('street1.png').v('path'),
          imageNew: state.page().file('street2.png').v('path')
        })}
      </div>
      <div class="w100 bgc-black fc-white py3">
        <div class="x xw mxwidth p0-5" style="margin: 0 auto;">
          <div class="c12 sm-c8 co0 sm-co2">
            <div class="p0-5">
              ${video.render({
                active: !page.timeout || state.ui.p2p,
                video: page.video,
                src: '/content/los-angeles/2018-04-28/videos/' + page.video + '.mp4',
                play: page.videoPlaying,
                handlePlay: handlePlay,
                handlePause: handlePause,
                handleTimeout: handleTimeout
              })}
            </div>
            ${objectKeys(page.videos).map(renderTalk)}
          </div>
        </div>
      </div>
      <div class="w100">
        <div class="x xw mxwidth p0-5" style="margin: 0 auto;">
          <div class="p0-5 c12 sm-c6">
            <a href="https://twitter.com/daniellecrobins/status/990341378302361601" target="_blank">
              <img src="${state.page().file('group.jpg').v('path')}" class="db">
            </a>
          </div>
          <div class="p0-5 c12 sm-c6">
            <div class="copy copy-simple">
              ${format(state.page().v('text'))}
            </div>
          </div>
        </div>
      </div>
      <a href="https://folder.studio" class="db bgc-black psr la2-poster">
        <img
          src="${state.page().file('ig-poster.jpg').v('path')}"
          class="psa t0 l0 r0 b0 h100 w100"
        >
        <div class="pen psa z2 b0 r0 p1 fc-white external">
          Risograph print by Folder Studio
        </div>
      </a>
      ${footer()}
    </div>
  `


  function renderTalk (key, i) {
    var props = page.videos[key]
    var active = key === page.video
    return html`
      <div class="x ${page.public !== false ? 'curp' : ''} px0-5" onclick=${page.public !== false ? handleClick : ''}>
        <div class="ff-mono ${active && page.playing ? 'blink' : ''}" style="width: 1.5em">
          ${active ? '→' : i + 1}
        </div>
        <div class="xx">${props.title}</div>
        <div class="ff-mono">
          ${props.time}
        </div>
      </div>
    `

    function handleClick () {
      if (page.timeout) return
      emit(state.events.CUSTOM, {
        page: '/los-angeles/2018-04-28',
        data: { videoPlaying: true, video: key }
      })
    }
  }

  function toggleSound () {
    if (sound) sound.load()
    emit(state.events.CUSTOM, {
      page: '/los-angeles/2018-04-28',
      data: { playing: !page.playing }
    })
  }

  function handlePlay (data) {
    emit(state.events.CUSTOM, {
      page: '/los-angeles/2018-04-28',
      data: { videoPlaying: true, video: data.video }
    })
  }

  function handlePause () {
    emit(state.events.CUSTOM, {
      page: '/los-angeles/2018-04-28',
      data: { videoPlaying: false }
    })
  }

  function handleTimeout () {
    emit(state.events.CUSTOM, {
      page: '/los-angeles/2018-04-28',
      data: { timeout: true }
    })
  }
}
