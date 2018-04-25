var html = require('choo/html')
var header = require('../components/header')
var footer = require('../components/footer')
var logEntry = require('../components/log-entry')

module.exports = view

function view (state, emit) {
  var page = state.page

  return html`
    <div class="x xdc vhmn100">
      <div>
        ${header(state, emit)}
      </div>
      <div class="xx x xjc xac">
        ${logEntry(state, emit, page().value())} 
      </div>
      <div>
        ${footer(state, emit)}
      </div>
    </div>
  `

  function createEntry (props) {
    return html`
      <div>
        ${props.title}<br>
        ${props.text}<br>
      </div>
    `
  }
}