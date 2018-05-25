var html = require('choo/html')
var xtend = require('xtend')

var Livestream = require('../components/livestream')
var header = require('../components/header')
var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
  return html`
    <div class="vhmn100 x xdc xjb c12 lh1-5 fs1">
      ${header(state, emit)}
      <div class="xx x">
        ${createLivestream()}
      </div>
    </div>
  `

  function createLivestream () {
    return state
      .cache(Livestream, 'home:livestream')
      .render(xtend(state.livestream, {
        live: true
      }))
  }
}