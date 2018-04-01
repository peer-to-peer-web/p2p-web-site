var html = require('choo/html')
var wrapper = require('../components/wrapper')
var Form = require('../components/form-mailinglist')
var header = require('../components/header')

var form = new Form()

var TITLE = 'Peer-to-Peer Web'

module.exports = wrapper(view)

function view (state, emit) {
  if (!state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div class="vhmn100">
      <div class="vhmn100 x xdc xjb c12 p0-5 lh1-25 fs2 sm-fsvw6">
        <div class="copy p0-5">
          <h2>Peer-to-Peer Web</h2>
          <ul>
            <li>/ <a href="/berlin" class="pb0">Berlin</a></li>
            <li>/ <a href="/los-angeles" class="pb0">Los Angeles</a></li>
          </ul>
        </div>
        <div class="p0-5 c12 sm-c6 md-c4">
          ${form.render()}
        </div>
      </div>
    </div>
  `
}
