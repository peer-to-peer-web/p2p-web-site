var Page = require('enoki/page')
var html = require('choo/html')

var wrapper = require('../components/wrapper')
var header = require('../components/header')

module.exports = wrapper(view)

function view (state, emit) {
  var page = Page(state)
  var children = page().children().sortBy('date', 'asc').value()

  return html`
    <div>
      <div class="psa t0 l0 r0 z3">
        ${header(state, emit)}
      </div>
      <div class="vhmn100 psr x xjc xac p2 tac lh1-25 fs2 sm-fsvw6">
        <div>
          ${children.map(renderChild)}
        </div>
      </div>
    </div>
  `

  function renderChild (props) {
    return html`
      <div><a href="${props.url}">${props.title}</a></div>
    `
  }
}
