var Page = require('enoki/page')
var html = require('choo/html')

var header = require('../components/header')
var footer = require('../components/footer')
var libEvents = require('../lib/events')

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var children = page().children().visible().sortBy('date', 'asc').value()
  var previous = page(libEvents.previous(children)).sortBy('date', 'asc').toArray()
  var upcoming = page(libEvents.upcoming(children)).sortBy('date', 'asc').toArray()
  console.log(upcoming)

  return html`
    <div class="x xdc vhmn100">
      ${header(state, emit)}
      <div class="psr x xx xjc xac p1 tac lh1-25 fs2 sm-fsvw6">
        <div class="abbh">
          ${upcoming.length ? renderGroup('Upcoming', upcoming) : ''}
          ${previous.length ? renderGroup('Previous', previous) : ''}
        </div>
      </div>
      ${footer()}
    </div>
  `

  function renderGroup (title, children) {
    return html`
      <div class="p1">
        <div class="fs1">${title}</div>
        ${children.map(renderChild)}
      </div>
    `
  }

  function renderChild (props) {
    return html`
      <div><a href="${props.url}">${props.title}</a></div>
    `
  }
}
