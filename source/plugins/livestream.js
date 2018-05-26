var WebSocket = require('../lib/ws')
var xtend = require('xtend')
var xhr = require('xhr')

module.exports = plugin

function plugin (opts) {
  return function (state, emitter) {
    var ws
    state.livestream = {
      live: false,
      loaded: false,
      fallback: false,
      http: 'https://p2p-web-livestream.glitch.me?' + Math.floor(new Date () / 1000),
      address: 'wss://p2p-web-livestream.glitch.me',
      source: 'https://broadcast.sh:4433/hls/b73bg37478bkb9b/index.m3u8',
      title: 'NYC'
    }

    state.events.LIVESTREAM = 'livestream' 
    emitter.on(state.events.DOMCONTENTLOADED, handleLoad)

    function handleLoad () {
      ws = new WebSocket(state.livestream.address)

      ws.addEventListener('error', function (event) {
        xhr(state.livestream.http, function (err, res, body) {
          try {
            var data = JSON.parse(body)
            state.livestream = xtend(state.livestream, data)
          } catch (err) { }
          state.livestream.loaded = true
          emitter.emit(state.events.RENDER)
        })
      })

      ws.addEventListener('open', function (event) {
        state.livestream.loaded = true
        emitter.emit(state.events.RENDER)
      })

      ws.addEventListener('close', function (event) {
        state.livestream.live = false
        state.livestream.loaded = true
        emitter.emit(state.events.RENDER)
      })

      ws.addEventListener('message', function (event) {
        var data = JSON.parse(event.data)
        state.livestream = xtend(state.livestream, data)
        emitter.emit(state.events.RENDER)
      })
    }
  }
}