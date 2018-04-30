var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var style = css`
  video {
    object-fit: cover;
  }

  input[type='range'] {
    color: currentColor;
    -webkit-appearance: none;
    background-color: none;
    height: 1rem;
    vertical-align: middle;
    width: 100%;
    outline: 0;
    cursor: ew-resize;
    display: block;
  }

  input[type='range']::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: currentColor;
    height: 1px;
    outline: 0;
  }

  input[type='range']::-moz-range-track {
    -moz-appearance: none;
    background: currentColor;
    height: 1px;
    outline: 0;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    border-radius: 0.5rem;
    border: 0;
    background: currentColor;
    margin-top: -0.5rem;
    height: 1rem;
    width: 1rem;
  }

  input[type='range']::-moz-range-thumb {
    -moz-appearance: none;
    border-radius: 0.5rem;
    border: 0;
    background: currentColor;
    margin-top: -0.5rem;
    height: 1rem;
    width: 1rem;
  }

  input[type='range']::-moz-focus-outer { border: 0; }

`

module.exports = class Video extends Nanocomponent {
  constructor () {
    super()

    this.data = {
      timeout: 0
    }

    this.state = {
      active: true,
      video: '',
      src: '',
      time: 0,
      duration: 0,
      playing: false
    }

    this.handleTimeUpdate = this.handleTimeUpdate.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleMeta = this.handleMeta.bind(this)
  }

  load (element) {

  }

  createElement (props) {
    if (!this.elTimeStamp) this.elTimeStamp = this.renderTimeStamp()
    if (!this.elScrubber) this.elScrubber = this.renderScrubber()
    if (!this.elVideo) this.elVideo = this.renderVideo(props.src)

    return html`
      <div class="fs1">
        <div
          class="bgc-black psr ${style}"
          style="padding-bottom: 56.25%"
        >
          ${this.state.active
            ? [this.elVideo]
            : this.renderPlaceholder()
          }
        </div>
        <div class="x py0-5 lh1 bb1-cc">
          ${this.elScrubber}
          ${this.elTimeStamp}
        </div>
      </div>
    `
  }

  update (props) {
    if (props.active === false) {
      this.state.active = false
      this.elVideo.pause()
      return true
    }

    if (props.src !== this.state.src) {
      var playing = this.state.playing
      this.state = props
      this.elVideo.src = this.state.src
      this.state.time = 0
      this.elVideo.currentTime = 0
      this.elScrubber.value = 0
      if (playing || props.play) {
        setTimeout(() => this.elVideo.play())
      }
      return true
    }

    if (props.play) {
      setTimeout(() => this.elVideo.play())
    }

    return false
  }

  handlePlay (event) {
    if (!this.state.handlePlay) return
    this.state.playing = true
    this.state.handlePlay(this.state)
  }

  handlePause (event) {
    if (!this.state.handlePause) return
    this.state.playing = false
    this.state.handlePause(this.state)
  }

  handleTimeUpdate (event) {
    this.data.timeout += 1
    this.state.time = this.elVideo.currentTime

    if (this.data.timeout >= 7.5 * 60 && this.state.active) {
      if (this.state.handleTimeout) {
        this.state.handleTimeout()
      }
    }

    if (this.elTimeStamp) {
      this.elTimeStamp.innerHTML = formatTime(this.state.time)
    }

    if (this.elScrubber && this.state.duration) {
      this.elScrubber.value = this.state.time / this.state.duration * 100
    }

    if (!this.state.handleTimeUpdate) return
    this.state.handleTimeUpdate(this.state)
  }

  handleClick (event) {
    if (this.state.playing) {
      this.elVideo.pause()
    } else {
      this.elVideo.play()
    }
  }

  handleMeta (event) {
    this.state.duration = this.elVideo.duration
  }

  renderScrubber () {
    var self = this

    return html`
      <input
        type="range"
        value="0"
        min="0"
        max="100"
        step="0.1"
        oninput=${handleInput}
        onmousedown=${handleMouseDown}
        onmouseup=${handleMouseUp}
      >
    `

    function handleInput (event) {
      self.elVideo.currentTime = Math.floor(event.target.value * (self.state.duration / 100))
    }

    function handleMouseDown (event) {
      self.elVideo.pause()
    }

    function handleMouseUp (event) {
      self.elVideo.play()
    }
  }

  renderPlaceholder () {
    return html`
      <div class="fc-white lh1-25">
        <div class="op25 psa t0 l0 r0 b0 bgsc bgpc bgrn" style="background-image: url(/assets/01-los-angeles/imgs/jon.jpg)"></div>
        <div class="p0-5 psa t0 l0 r0 b0">
          <div class="lh1-5 p0-5 fs1">
            It’s expensive to self-host video outside of centralized platforms.
          </div>
          <div class="fs1 p0-5 sm-lh1-5 copy copy-width">
            To continue watching, visit <a href="dat://peer-to-peer-web.com">dat://peer-to-peer-web.com</a> in <a href="https://beakerbrowser.com">Beaker Browser</a>, or <a href="dat://e290d1b3fbd814c741e7482135e1a809ba2cd512a7f011980cb9a05568bd03c2">download</a> with <a href="https://docs.datproject.org/install">Dat</a>. In addition, you can support the community by saving this archive to your library, which will distribute the bandwidth load. Thanks!
          </div>
        </div>
      </div>
    `
  }

  renderVideo (src) {
    return html`
      <video
        src="${src || this.state.src}"
        class="psa t0 l0 w100 h100 curp"
        onplay=${this.handlePlay}
        onpause=${this.handlePause}
        ontimeupdate=${this.handleTimeUpdate}
        onclick=${this.handleClick}
        onloadedmetadata=${this.handleMeta}
      >
    `
  }

  renderTimeStamp () {
    return html`
      <div class="ff-mono pl1">
        ${formatTime(this.state.time)}
      </div>
    `
  }
}

function formatTime (seconds) {
  var minutes = Math.floor(seconds / 60)
  minutes = (minutes >= 10) ? minutes : '0' + minutes
  seconds = Math.floor(seconds % 60)
  seconds = (seconds >= 10) ? seconds : '0' + seconds
  return minutes + ':' + seconds
}
