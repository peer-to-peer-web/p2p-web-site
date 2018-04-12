var objectValues = require('object-values')
var Page = require('enoki/page')
var html = require('choo/html')
var xtend = require('xtend')

var FormRsvp = require('../../../components/form-rsvp')
var format = require('../../../components/format')
var footer = require('../../../components/footer')
var header = require('../../../components/header')

var BerlinHeader = require('./header')
var positions = {
  one: getPosition(),
  smile: getPosition({ range: 40 })
}

module.exports = view

function view (state, emit) {
  var page = new Page(state)
  var venue = page().value('venue')

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
        <div class="c12 p0-5 bgc-white">
          <div class="x xw mxa mxwidth">
            <div class="c12 sm-c6 p0-5 fc-black copy">
              ${raw(lang[state.ui.lang].text.split('\n')[0] + ' <a href="/about">Continue reading…</a>')}
              
            </div>
            <div class="c12 sm-c6 fs2 p0-5">
              ${state
                .cache(FormRsvp, 'berlin-rsvp')
                .render({
                  event: 'berlin-2',
                  lang: state.ui.lang
                })
              }
            </div>
          </div>
        </div>
      </div>
      ${footer()}
    </div>
  `
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
