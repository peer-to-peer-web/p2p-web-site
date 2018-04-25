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
      fallbackActive: false,
      muted: false,
      ready: false,
      fallback: '',
      source: '',
      title: ''
    }

    this.handlePlayPause = this.handlePlayPause.bind(this)
  } 

  load (element) {
    var self = this
    var hls = this.hls = new Hls()
    var supported = Hls.isSupported()
    var shouldUpdate = supported !== this.local.supported
    var elVideo = this.elVideo = element.querySelector('video')

    // start streaming if supported
    if (supported) {
      hls.loadSource(this.local.source)
      hls.attachMedia(elVideo)
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        elVideo.play()
      })
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
        <div class="x xjb p0-5 lh1 psr z2">
          <div class="p0-5">${this.local.title}</div>
          <div class="p0-5 blink-sec">LIVE</div>
        </div>
      </div>
    `
  }

  createContent () {
    if (this.local.supported) {
      return html`<video onclick=${this.handlePlayPause}></video>`
    } else {
      return html`<div>${this.local.fallback}</div>`
    }
  }

  handlePlayPause (event) {
    if (this.elVideo.paused) this.elVideo.play()
    else this.elVideo.pause()
  }

  update (props) {
    props = props || { }
    return props.fallbackActive !== this.local.fallbackActive
  }
}

