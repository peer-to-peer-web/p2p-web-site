var html = require('choo/html')
var format = require('../components/format')
var footer = require('../components/footer')
var header = require('../components/header')

module.exports = view

function view (state, emit) {
  var page = state.content['/about']
  var lang = {
    en: {
      title: page.title,
      text: page.texten
    },
    de: {
      title: page.titlede,
      text: page.textde
    }
  }

  return html`
    <div class="vhmn100 x xdc xjb c12 lh1-5 fs1">
      ${header(state, emit)}
      <div class="p0-5 my4">
        <div class="p0-5 mxa copy-simple copy-width">
          ${format(lang[state.ui.lang].text)}
        </div>
        <div class="p0-5 mxa copy-simple copy-width">
          <a href="mailto:yo@peer-to-peer-web.com">yo@peer-to-peer-web.com</a>
        </div>
      </div>
      ${footer()}
    </div>
  `
}
