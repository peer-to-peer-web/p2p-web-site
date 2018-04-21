var html = require('choo/html')
var header = require('../components/header')
var footer = require('../components/footer')

module.exports = view

function view (state, emit) {
  return html`
    <div class="x xdc vhmn100">
      <div>
        ${header(state, emit)}
      </div>
      <div class="xx">
        log here yo
      </div>
      <div>
        ${footer(state, emit)}
      </div>
    </div>
  `
}