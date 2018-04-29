var html = require('choo/html')
var css = require('sheetify')
var format = require('../../components/format')
var footer = require('../../components/footer')
var header = require('../../components/header')
var styles = css('./index.css')

module.exports = view

function view (state, emit) {
  var entries = getMedia(state)
  console.log(entries)

  return html`
    <div class="vhmn100 x xdc xjb c12 lh1-5 fs1">
      <div class="c12 bgc-white">
        ${header(state, emit)}
      </div>
      <div class="xx x psr">
        <div class="c8">
          <div class="bgc-black fc-white psst t0 vh100">
            hey there
          </div>
        </div>
        <div class="c4 bt1-black bb1-black">
          hi there
        </div>
      </div>
      ${footer()}
    </div>
  `
}

function getMedia (state) {
  return state
    .page('/')
    .pages()
    .toArray()
    .filter(isVisible)
    .reduce(function (res, cur) {
      state
        .page(cur.url)
        .pages()
        .toArray()
        .forEach(function (props) {
          res.push(props)
        })
      return res
    }, [ ])

  function isVisible (props) {
    return state.ui.dev
      ? props.view === 'city' && props.private !== true
      : props.view === 'city' && props.visible !== false && props.private !== false
  }
}