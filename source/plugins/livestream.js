module.exports = plugin

function plugin (opts) {
  return function (state, emitter) {
    state.livestream = {
      active: false,
      loaded: false,
      fallback: false,
      source: 'https://broadcast.sh:4433/hls/b73bg37478bkb9b/index.m3u8'
      // source: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
      title: 'Los Angeles'
    }

    state.events.LIVESTREAM = 'livestream' 

    emitter.on(state.events.DOMCONTENTLOADED, handleLoad)
    emitter.on(state.events.LIVESTREAM, handleLivestream)

    function handleLoad () {
      // fetch livestream check
      // -> markup for that here
      // yeah we’re loaded
      // state.livestream.active = true
      state.livestream.loaded = true
      emitter.emit(state.events.RENDER)
    }

    function handleLivestream (data) {
      console.log('livestream stuff')
    }
  }
}