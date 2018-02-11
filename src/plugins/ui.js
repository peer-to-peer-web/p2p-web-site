var FontFaceObserver = require('fontfaceobserver')
var xtend = require('xtend')
var xhr = require('xhr')

var streamDate = new Date('Sat Feb 10 2018 13:45:00 GMT')

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
    state.ui.p2p = typeof DatArchive !== false
    loadFonts()
    // checkLivestream()

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

  function checkLivestream() {
    var dateNow = new Date()
    var dateLocal = dateNow.valueOf() + dateNow.getTimezoneOffset() * 60000
    if (dateLocal >= streamDate.valueOf() && !state.ui.livestream) {
      state.ui.livestream = true
      emitter.emit(state.events.RENDER)
    } else {
      setTimeout(checkLivestream, 1000 * 60)
    }
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
