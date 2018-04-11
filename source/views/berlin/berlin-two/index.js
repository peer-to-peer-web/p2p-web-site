var Page = require('enoki/page')
var html = require('choo/html')
var xtend = require('xtend')

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
   
  return html`
    <div>
      <div class="vhmn100 x xdc xjb c12 lh1-5 fs1">
        ${header(state, emit)}
        <div class="psr x xx xdc oh">
          ${createExtra({
            position: positions.smile,
            source: page().file('happy.png').value('path'),
          })}
          <div class="xx x xdc xjb p1 z2 fc-white pen">
            <div class="lh1 fsvw12">${page().value('intro')}</div>
            <div class="fs1 lh1-5 ff-mono mt1">
              ${page()
                .value('introtags')
                .map(tag => html`<span class="pr1">#${tag}</span>`)
              }
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
