var objectValues = require('object-values')
var objectKeys = require('object-keys')
var Page = require('enoki/page')
var html = require('choo/html')
var xtend = require('xtend')

var FormRsvp = require('../../../components/form-rsvp')
var format = require('../../../components/format')
var footer = require('../../../components/footer')
var header = require('../../../components/header')
var Video = require('../../../components/video-two')

var BerlinHeader = require('./header')
var video = new Video()
var positions = {
  one: getPosition(),
  smile: getPosition({ range: 40 })
}

module.exports = view

function view (state, emit) {
  var page = new Page(state)
  var venue = page().value('venue')
  var local = xtend(
    state.content['/berlin/2018-05-05'],
    state.custom['/berlin/2018-05-05']
  ) 

  var lang = {
    en: {
      text: page('/about').value('texten')
    },
    de: {
      text: page('/about').value('textde')
    }
  }

  return html`
    <div>
      <div class="vhmn100 x xdc xjb c12 lh1-5 fs1">
        ${header(state, emit)}
        <div class="psr x xx xdc oh">
          <div class="xx x xdc xjb p0-5 z2 fc-white">
            <div class="lh1 fsvw12 pen p0-5">${page().value('intro')}</div>
            <div class="x xw c12">
              <div class="mb4 sm-b0 c12 sm-c6 psr">
                ${createExtra({
                  position: positions.smile,
                  source: page().file('happy.png').value('path')
                })}
              </div>
              <div class="c12 sm-c6 fs2 co0 lh1-25 p0-5 mt4">
                ${objectValues(page().value('speakers'))
                  .map(function (speaker) {
                    return html`<div>
                      <a href="${speaker.href}" target="_blank">${speaker.name}</a>
                      <span class="external"></span>
                    </div>`
                  })
                }
              </div>
              <div class="c12 x xw mt4 fs2">
                <div class="c12 sm-c6 lh1-25 ff-mono p0-5">
                  ${page()
                    .value('introtags')
                    .map(function (tag) {
                      return html`<div>#${tag}</div>`
                    })
                  }
                </div>
                <div class="c12 sm-c6 lh1-25 p0-5">
                  <div>${venue.name}</div>
                  <div><a href="${venue.map}">${venue.address}</a></div>
                  <div>${page().value('title')} @ ${page().value('time')}</div>
                </div>
              </div>
            </div>
          </div>
          ${state
            .cache(BerlinHeader, 'berlin-header')
            .render({
              src: page().file('dish.jpg').value('path'),
              displacement: page().file('displacement.png').value('path'),
            })
          }
        </div>
      </div>
      <div class="bgc-white fc-black py3">
        <div class="x xw mxwidth p0-5" style="margin: 0 auto;">
          <div class="c12 sm-c8 co0 sm-co2">
            <div class="p0-5">
              ${video.render({
                active: !local.timeout || state.ui.p2p,
                video: local.video,
                src: '/content/berlin/2018-05-05/videos/' + local.video + '.mp4',
                play: local.videoPlaying,
                handlePlay: handlePlay,
                handlePause: handlePause,
                handleTimeout: handleTimeout
              })}
            </div>
            ${objectKeys(local.videos).map(renderTalk)}
          </div>
        </div>
      </div>
      <div class="w100 fc-white py3 bgc-white">
        <div class="c12 p0-5">
          <div class="mxa mxwidth">
            ${createSponsors(state, emit)}
          </div>
        </div>
      </div>
      ${footer()}
    </div>
  `

  function renderTalk (key, i) {
    var props = local.videos[key]
    var active = key === local.video
    return html`
      <div class="x ${local.public !== false ? 'curp' : ''} px0-5" onclick=${local.public !== false ? handleClick : ''}>
        <div class="ff-mono ${active && local.playing ? 'blink' : ''}" style="width: 1.5em">
          ${active ? '→' : i + 1}
        </div>
        <div class="xx">${props.title}</div>
        <div class="ff-mono">
          ${props.time}
        </div>
      </div>
    `

    function handleClick () {
      if (local.timeout) return
      emit(state.events.CUSTOM, {
        page: '/los-angeles/2018-04-28',
        data: { videoPlaying: true, video: key }
      })
    }
  }

  function handlePlay (data) {
    emit(state.events.CUSTOM, {
      page: '/berlin/2018-05-05',
      data: { videoPlaying: true, video: data.video }
    })
  }

  function handlePause () {
    emit(state.events.CUSTOM, {
      page: '/berlin/2018-05-05',
      data: { videoPlaying: false }
    })
  }

  function handleTimeout () {
    emit(state.events.CUSTOM, {
      page: '/berlin/2018-05-05',
      data: { timeout: true }
    })
  }
}

function createSponsors (state, emit) {
  var sponsors = objectValues(state.page().v('sponsors'))

  return html`
    <div class="x xjc fs1 fc-black p0-5 w100">
      ${sponsors.map(createSponsor)} 
    </div>
  `

  function createSponsor (props) {
    return html`
      <div class="pl1">
        <a href="${props.href}" target="_blank">
          <img src="${state.page().v('path')}/${props.svg}" class="db" style="height: 1.25rem">
        </a>
      </div>
    `
  }
}

function createExtra (props) {
  var opts = xtend({
    position: {
      x: 0,
      y: 0,
      rotation: 0
    }
  }, props)
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

function getPosition (props) {
  var opts = xtend({
    range: 0
  }, props)
  return {
    x: Math.floor(Math.random() * 90),
    y: Math.floor(Math.random() * 90),
    rotation: (Math.random() * opts.range) - (opts.range / 2)
  }
}
