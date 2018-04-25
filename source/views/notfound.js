var html = require('choo/html')
var format = require('../components/format')
var footer = require('../components/footer')
var header = require('../components/header')

module.exports = view

function view (state, emit) {
  var page = state.content['/coc']
  return html`
    <div class="vhmn100 x xdc xjb c12 lh1-5 fs1">
      ${header(state, emit)}
      <div class="p1 x xx xjc xac ff-mono">
        404
      </div>
      ${footer()}
    </div>
  `
}
