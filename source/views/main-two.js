var html = require('choo/html')
var css = require('sheetify')

var Form = require('../components/form-mailinglist')
var wrapper = require('../components/wrapper')
var header = require('../components/header')
var form = new Form()

var TITLE = 'Peer-to-Peer Web'

module.exports = wrapper(view)

function view (state, emit) {
  if (!state.title !== TITLE) {
    emit(state.events.DOMTITLECHANGE, TITLE)
  }

  return html`
    <div>
      <div class="psa t0 l0 r0 z3">
        ${header(state, emit)}
      </div>
      <div class="vhmn100 psr x xjc xac p2 tac lh1-25 fs2 sm-fsvw6">
        <div>
          <a href="/berlin" class="pb0">Berlin</a><br>
          <a href="/los-angeles" class="pb0">Los Angeles</a><br>
          <a href="/nyc" class="pb0">NYC</a>
        </div>
      </div>
    </div>
  `
}
