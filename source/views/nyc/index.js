var objectValues = require('object-values')
var objectKeys = require('object-keys')
var Page = require('enoki/page')
var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

var Video = require('../../components/video-two')
var header = require('../../components/header')
var format = require('../../components/format')
var footer = require('../../components/footer')
var sponsors = require('../../components/sponsors')
var NycHeader = require('./header')

var nycHeader = new NycHeader()
var positionSmile = getPosition({ range: 40 })

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
  var markings = page('/nyc/2018-05-26/markings').files().value()
  var active = xtend(
    state.content['/nyc/2018-05-26'],
    state.custom['/nyc/2018-05-26']
  )

  if (!state.title === TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div>
      <div class="fc-white psa t0 l0 r0 z3" style="mix-blend-mode: difference">
        ${header(state, emit)}
      </div>
      <div class="psa t0 l0 r0 vh100 pen" style="z-index: 5">
        ${createExtra({
          position: positionSmile,
          source: '/assets/happy.png'
        })}
      </div>
      <div class="${container} w100 vhmn100 bgc-black">
        ${nycHeader.render(state, emit, {
          markings: markings
        })}
        <div class="w100 sm-psa l0 b0 r0 z3 p0-5 fc-white" style="mix-blend-mode: difference">
          <div class="x xw mxa mxwidth">
            <div class="c12 sm-c4 p0-5">
              ${active.time}
            </div>
            <div class="c12 sm-tac sm-c4 p0-5">
              <a href="${active.locationhref}" target="_blank">${active.location}</a>
            </div>
            <div class="c12 sm-tar sm-c4 p0-5">
              <a href="${active.addresshref}" target="_blank">${active.address}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="c12 p0-5 bgc-white psr z2 fc-black">
        <div class="x xw mxa mxwidth">
          <div class="c12 sm-c8 py3" style="margin: 0 auto">
            <div class="p0-5">
              ${state.cache(Video, 'nyc-video')
                .render({
                  active: !active.timeout || state.ui.p2p,
                  video: active.video,
                  src: '/content/nyc/2018-05-26/videos/' + active.video + '.mp4',
                  play: active.videoPlaying,
                  handlePlay: handlePlay,
                  handlePause: handlePause,
                  handleTimeout: handleTimeout
                })
              }
            </div>
            ${objectKeys(active.videos).map(renderTalk)}
          </div>
          <div class="p0-5 c12"><div class="w100 bb1-black"></div></div>
          <div class="p0-5 c12 sm-c6 copy">
            <span class="external">Presented by <a href="https://newcomputers.group/" target="_blank">New Computer Working Group</a></span>
          </div>
          <div class="p0-5 c12 sm-c6">
            ${sponsors(state, emit)}
          </div>
        </div>
      </div>

      <div class="bgc-black psr z2">
        ${footer()}
    </div>
  `

  function renderTalk (key, i) {
    if (!active) return
    var props = active.videos[key]
    var isActive = key === active.video
    return html`
      <div class="x ${active.public !== false ? 'curp' : ''} px0-5" onclick=${active.public !== false ? handleClick : ''}>
        <div class="ff-mono ${isActive && active.playing ? 'blink' : ''}" style="width: 1.5em">
          ${isActive ? '→' : i + 1}
        </div>
        <div class="xx">${props.title}</div>
        <div class="ff-mono">
          ${props.time}
        </div>
      </div>
    `

    function handleClick () {
      if (active.timeout) return
      emit(state.events.CUSTOM, {
        page: '/nyc/2018-05-26',
        data: { videoPlaying: true, video: key }
      })
    }
  }

  function toggleSound () {
    if (sound) sound.load()
    emit(state.events.CUSTOM, {
      page: '/nyc/2018-05-26',
      data: { playing: !active.playing }
    })
  }

  function handlePlay (data) {
    emit(state.events.CUSTOM, {
      page: '/nyc/2018-05-26',
      data: { videoPlaying: true, video: data.video }
    })
  }

  function handlePause () {
    emit(state.events.CUSTOM, {
      page: '/nyc/2018-05-26',
      data: { videoPlaying: false }
    })
  }

  function handleTimeout () {
    emit(state.events.CUSTOM, {
      page: '/nyc/2018-05-26',
      data: { timeout: true }
    })
  }
}

function getPosition (props) {
  var opts = xtend({
    range: 0
  }, props)
  return {
    x: Math.floor(Math.random() * 90),
    y: Math.floor(Math.random() * 60),
    rotation: (Math.random() * opts.range) - (opts.range / 2)
  }
}


function createExtra (props) {
  return html`
    <div
      class="psa z3 pen m2"
      style="
        top: ${props.position.y}%;
        left: ${props.position.x}%;
        transform: rotate(${props.position.rotation}deg);
      "
    >
      <img
        src="${props.source}"
        class="db"
        style="max-width: 5rem; width: 5rem; height: 5rem;"
      >
    </div>
  `
}
