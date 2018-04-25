var FontFaceObserver = require('fontfaceobserver')
var xtend = require('xtend')
var xhr = require('xhr')

var streamDate = new Date('Sat Feb 10 2018 13:45:00 GMT')

module.exports = ui

function ui (state, emitter, app) {
  state.ui = {
    dev: false,
    lang: 'en',
    langs: ['en', 'de'],
    p2p: false,
    loaded: false,
    rsvp: false
  }

  state.events.UI = 'ui'

  emitter.on(state.events.DOMCONTENTLOADED, function () {
    state.ui.dev = state.query.dev
    state.ui.p2p = typeof DatArchive === 'function'
    loadFonts()
  })

  emitter.on(state.events.UI, function (data) {
    state.ui = xtend(state.ui, data)
  })

  emitter.on(state.events.NAVIGATE, function () {
    window.scrollTo(0, 0)
  })

  function loadFonts () {
    var fontsLoaded = new FontFaceObserver('Lars Light')

    fontsLoaded
      .load()
      .then(function () {
        state.ui.loaded = true
        emitter.emit(state.events.RENDER)
      }, function () {
        state.ui.loaded = true
        emitter.emit(state.events.RENDER)
      })

    setTimeout(function () {
      state.ui.rsvp = true
      emitter.emit(state.events.RENDER)
    }, 1500)
  }
}
