var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var xtend = require('xtend')
var css = require('sheetify')
var Hls = require('hls.js')

var styles = css('./livestream.css')

module.exports = class Livestream extends Nanocomponent {
  constructor (name, state, emit) {
    super()
    this.state = state
    this.emit = emit

    this.local = {
      supported: true,
      muted: false,
      ready: false,
      fallback: false,
      source: '',
      title: ''
    }

    this.handlePlayPause = this.handlePlayPause.bind(this)
  } 

  load (element) {
    var self = this
    var hls = this.hls = new Hls()
    var supported = (
      Hls.isSupported() || 
      video.canPlayType('application/vnd.apple.mpegurl')
    )
    var shouldUpdate = supported !== this.local.supported
    var elVideo = this.elVideo = element.querySelector('video')

    // play
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      elVideo.play()
      self.handleStreamLoad()
    })

    // start streaming if supported
    if (Hls.isSupported()) {
      this.attemptLoad()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      elVideo.src = self.local.source
      elVideo.addEventListener('canplay',function() {
        elVideo.play()
      })
    } else {
      this.local.ready = true
      supported = false
    }

    // update
    this.local.supported = supported
    if (shouldUpdate) this.rerender()
  }

  unload (element) {

  }

  createElement (props) {
    this.local = xtend(this.local, props)

    return html`
      <div class="w100 xx xdc x ${styles}">
        <div class="xx">
          ${this.createContent()}
        </div>
        ${!this.local.ready ? this.createLoading() : ''}
        <div class="x xjb p0-5 lh1 psr z2">
          <div class="p0-5">${this.local.title}</div>
          <div class="p0-5 ${this.local.ready ? '' : 'op0'}" data-live-indicator>LIVE</div>
        </div>
      </div>
    `
  }

  createLoading () {
    return html`
      <div class="psa t0 l0 r0 b0 x xjc xac pen ttu ff-mono" data-livestream-loading>
        <div class="blink">Buffering</div>
      </div>
    `
  }

  createContent () {
    if (this.local.supported && !this.local.fallback) {
      return html`<video onclick=${this.handlePlayPause}></video>`
    } else {
      return html`<iframe src="https://player.twitch.tv/?channel=jondashkyle" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe>`
    }
  }

  handleStreamLoad () {
    var loading = this.element.querySelector('[data-livestream-loading]')
    var live = this.element.querySelector('[data-live-indicator]')
    if (loading) loading.parentNode.removeChild(loading)
    if (live) live.classList.remove('op0')
    this.local.ready = true
  }

  handlePlayPause (event) {
    if (this.elVideo.paused) this.elVideo.play()
    else this.elVideo.pause()
  }

  attemptLoad () {
    this.hls.loadSource(this.local.source)
    this.hls.attachMedia(this.elVideo)
    if (!this.local.ready) {
      setTimeout(this.attemptLoad.bind(this), 5000)
    }
  }

  update (props) {
    props = props || { }
    return props.fallback !== this.local.fallback
  }
}

