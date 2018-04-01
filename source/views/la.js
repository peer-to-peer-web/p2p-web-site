var objectKeys = require('object-keys')
var html = require('choo/html')
var xtend = require('xtend')

var format = require('../components/format')
var FormRsvp = require('../components/form-rsvp')
var navigation = require('../components/navigation')
var Video = require('../components/video-two')
var footer = require('../components/footer')
var header = require('../components/header')

var formRsvp = new FormRsvp()
var video = new Video()

var TITLE = 'Peer-to-Peer Web / Los Angeles'

module.exports = view

function view (state, emit) {
  var page = xtend(
    state.content['/los-angeles/2017-12-10'],
    state.custom['/los-angeles/2017-12-10']
  )

  if (state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div>
      <div class="x xdc sm-vhmn100">
        ${header(state, emit)}
        <div
          class="x xdc xjb xx p1 psr wsnw lh1 usn fsvw12 bgc-black fc-white"
          style="padding-bottom: 2vw;"
        >
          <div class="psa t0 l0 r0 b0 x xjc xac pen">
            ${slideshow()}
          </div>
          <div class="x xjb">
            <div>Peer-to-Peer</div>
            <div class="usn arrow">→</div>
          </div>
          <div class="pen op0 sm-dn">-</div>
          <div class="x xjb c12">
            <div>Web</div>
            <div>Los</div>
          </div>
          <div class="pen op0 sm-dn">-</div>
          <div class="x xjb">
            <div class="usn">←</div>
            <div>Angeles, Ca</div>
          </div>
        </div>
      </div>
      <div class="x xw c12 p0-5 mxwidth sm-py2" style="margin: 0 auto;">
        <div class="c12 sm-c8 sm-co2 md-c6 md-co3 sm-py2">
          <div class="copy p0-5">
            ${format(page.text)}
          </div>
        </div>
        <div class="c12 sm-c8 sm-co2 md-c6 md-co3 sm-py2">
          ${renderVideo()}
          ${objectKeys(page.videos).map(renderTalk)}
        </div>
        <div class="c12 sm-c6 p0-5 sm-py2">
          <img src="/content/los-angeles/2017-12-10/media/la.jpg" class="grayscale c12">
          <div class="c12 pt0-5">
            LA, CA event
          </div>
        </div>
        <div class="c12 sm-c6 p0-5 sm-py2">
          <img src="/content/los-angeles/2017-12-10/media/nyc.jpg" class="grayscale c12">
          <div class="c12 pt0-5">
            NY, NY <a href="http://newcomputers.group/">viewing party</a>
          </div>
        </div>
      </div>
      ${footer()}
    </div>
  `

  function renderVideo () {
    if (!page.video) return

    return html`
      <div class="c12 p0-5">
        ${video.render({
          active: !page.timeout || state.ui.p2p,
          video: page.video,
          src: '/content/los-angeles/2017-12-10/media/' + page.video + '.mp4',
          play: page.playing,
          handlePlay: handlePlay,
          handlePause: handlePause,
          handleTimeout: handleTimeout
        })}
      </div>
    `
  }

  function renderTalk (key, i) {
    var props = page.videos[key]
    var active = key === page.video
    return html`
      <div class="x curp px0-5" onclick=${handleClick}>
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
      emit(state.events.CONTENT, {
        page: '/los-angeles/2017-12-10',
        data: { playing: true, video: key }
      })
    }
  }

  function handlePlay (data) {
    emit(state.events.CONTENT, {
      page: '/los-angeles/2017-12-10',
      data: { playing: true, video: data.video }
    })
  }

  function handlePause () {
    emit(state.events.CONTENT, {
      page: '/los-angeles/2017-12-10',
      data: { playing: false }
    })
  }

  function handleTimeout () {
    emit(state.events.CONTENT, {
      page: '/los-angeles/2017-12-10',
      data: { timeout: true }
    })
  }
}

function slideshow (props) {
  var image = '/assets/imgs/default.jpg'
  return html`
    <div>
      <img src="${image}" style="object-fit: contain; height: 33vw; width: 33vw">
    </div>
  `
}
