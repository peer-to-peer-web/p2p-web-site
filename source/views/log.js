var html = require('choo/html')
var header = require('../components/header')
var footer = require('../components/footer')
var logEntry = require('../components/log-entry')

module.exports = view

function view (state, emit) {
  var page = state.page

  // loading
  if (!state.site.logLoaded) {
    return html`
      <div class="vhmn100 x xjc xac">
        Loading
      </div>
    `
  }

  var entries = page('/log')
    .pages()
    .sortBy('date', 'desc')
    .value()

  return html`
    <div class="x xdc vhmn100">
      ${header(state, emit)}
      <div class="x xx xjc xac py3">
        ${entries.length > 1
          ? entries.map(props => logEntry(state, emit, props))
          : createLogEmpty()
        }
      </div>
      ${footer(state, emit)}
    </div>
  `
}

function createLogEmpty () {
  return html`
    <div class="home-log-empty w100 p1 x xjc xac">
      (Must be online to access the Log)
    </div>
  `
}
