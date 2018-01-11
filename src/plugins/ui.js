var FontFaceObserver = require('fontfaceobserver')
var xtend = require('xtend')
var xhr = require('xhr')

module.exports = ui

function ui (state, emitter, app) {
  state.ui = {
    lang: 'en',
    p2p: false,
    livestream: false,
    loaded: false,
    rsvp: false
  }

  state.events.UI = 'ui'

  emitter.on(state.events.DOMCONTENTLOADED, function () {
    state.ui.p2p = window.location.protocol === 'dat:'
    loadOptions()
    loadFonts()
    // bankai fix
    try {
      document.querySelector('head').removeChild(document.querySelector('style'))
    } catch (err) { }
  })

  emitter.on(state.events.UI, function (data) {
    state.ui = xtend(state.ui, data)
  })

  emitter.on(state.events.NAVIGATE, function () {
    window.scrollTo(0, 0)
  })

  function loadOptions () {
    var timestamp = process.env.NODE_ENV === 'production' ? '?' + (new Date().getTime()) : ''
    xhr('/assets/options.json' + timestamp, function (err, resp, body) {
      if (err) return
      try {
        state.ui = xtend(state.ui, JSON.parse(body))
        emitter.emit(state.events.RENDER)
      } catch (err) {
        return
      }
    })
  }

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
