module.exports = plugin

function plugin (opts) {
  return function (state, emitter) {
    state.livestream = {
      fallbackActive: false,
      active: false,
      loaded: false,
      fallback: '',
      source: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8',
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
      state.livestream.source = '/content/los-angeles/2017-12-10/media/02-jon-gacnik.mp4' 
      state.livestream.loaded = true
      emitter.emit(state.events.RENDER)
    }

    function handleLivestream (data) {
      console.log('livestream stuff')
    }
  }
}