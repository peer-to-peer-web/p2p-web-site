var WebSocket = require('../lib/ws')

module.exports = plugin

function plugin (opts) {
  return function (state, emitter) {
    var ws
    state.livestream = {
      live: false,
      loaded: false,
      fallback: false,
      address: 'wss://p2p-web-livestream.glitch.me',
      source: 'https://broadcast.sh:4433/hls/b73bg37478bkb9b/index.m3u8',
      title: 'Los Angeles'
    }

    state.events.LIVESTREAM = 'livestream' 

    emitter.on(state.events.DOMCONTENTLOADED, handleLoad)
    emitter.on(state.events.LIVESTREAM, handleLivestream)

    function handleLoad () {
      ws = new WebSocket(state.livestream.address)

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

        // active
        if (data.live !== undefined) {
          state.livestream.live = data.live
        }

        // scratch
        if (!state.livestream.editing && data.scratch !== undefined) {
          state.livestream.scratch = data.scratch
        }

        emitter.emit(state.events.RENDER)
      })
    }

    function handleLivestream (data) {
      console.log('livestream stuff')
    }
  }
}