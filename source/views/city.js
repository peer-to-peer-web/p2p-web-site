var Page = require('enoki/page')
var html = require('choo/html')

var header = require('../components/header')
var footer = require('../components/footer')
var libEvents = require('../lib/events')

module.exports = view

function view (state, emit) {
  var page = Page(state)
  var children = page().children().sortBy('date', 'asc').toArray().filter(isVisible)
  var previous = page(libEvents.previous(children)).sortBy('date', 'asc').toArray()
  var upcoming = page(libEvents.upcoming(children)).sortBy('date', 'asc').toArray()

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

  function isVisible (props) {
    return state.ui.dev
      ? true
      : props.visible !== false
  }

  function renderGroup (title, children) {
    return html`
      <div class="p1">
        <div class="fs1 ff-mono lh1-5">${title}</div>
        <div class="fs1 lh1-5">↓</div>
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
