var html = require('choo/html')
var wrapper = require('../components/wrapper')
var format = require('../components/format')
var footer = require('../components/footer')

module.exports = wrapper(view)

function view (state, emit) {
  var page = state.content['/coc']
  return html`
    <div class="vhmn100 x xdc xjb c12 p0-5 lh1-5 fs1">
      <div class="c12 pb4 lh1-25 fs2 sm-fsvw6">
        <div class="copy p0-5">
          <h2><a href="/" class="pb0">Peer-to-Peer Web</a></h2>
          <ul>
            <li>/ ${page.title}</li>
          </ul>
        </div>
      </div>
      <div class="p0-5 mb4">
        <div class="mxa copy-simple copy-width">
          ${format(page.text)}
        </div>
      </div>
      ${footer()}
    </div>
  `
}
