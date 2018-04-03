var Nanocomponent = require('nanocomponent')
var objectValues = require('object-values')
var html = require('choo/html')
var css = require('sheetify')
var pm = require('popmotion')
var xtend = require('xtend')

var styleMask = css`
  :host {
    background: #fff;
    border-radius: 50%;
    mix-blend-mode: difference;
    position: fixed;
    top: 0;
    left: 0;
    margin: -25vmin;
    height: 50vmin;
    width: 50vmin;
  }
`

var styleMarkings = css`
  :host {
    
  }

  :host > div {
    height: 33.3%;
    width: 33.3%;
  }
`

var styleHeader = css`
  :host {
    object-fit: contain;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    top: 50%;
    left: 50%;
    margin: -25vmin;
    height: 50vmin;
    width: 50vmin;
  }

  @keyframes nycimg {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
`

module.exports = class Header extends Nanocomponent {
  constructor (name) {
    super(name)
    this.state = {
      v: { x: 0, y: 0 },
      markings: { },
      markingsActive: [ ]
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  load (element) {
    var self = this
    var ball = this.element.querySelector('[data-nyc-mask]')
    var ballStyler = pm.styler(ball)
    var smooth = pm.transform.transformMap({
      x: pm.transform.smooth(1000),
      y: pm.transform.smooth(1000)
    })

    self.activeAction = pm.everyFrame().start(function (v) {
      ballStyler.set(smooth(getXY()))
    })

    function getXY (event) {
      return self.state.v
    }

    // listeners
    window.addEventListener('mousemove', this.handleMouseMove, false)
  }

  unload (element) {
    if (this.activeAction) this.activeAction.stop()
    window.removeEventListener('mousemove', this.handleMouseMove, false)
  }

  handleMouseMove (event) {
    this.state.v = { x: event.clientX, y: event.clientY }
  }

  update (state, emit, props) {
    return false 
  }

  createMarkings () {
    var markings = shuffle(objectValues(this.state.markings))
      .map(this.createMarking)

    return html`
      <div class="psf t0 l0 r0 b0 vh100 x xw z2 ${styleMarkings}">
        ${markings} 
      </div>
    `
  }

  createMarking (props) {
    return html`
      <div class="x xjc xac"><img src="${props.path}"></div>
    `
  }

  createElement (state, emit, props) {
    this.state = xtend(this.state, props)

    return html`
      <div>
        <img
          class="db psf ${styleHeader}"
          src="/content/nyc/2018-05-26/covers/img2.png"
        />
        ${this.createMarkings()}
        <div data-nyc-mask class="${styleMask}"></div>
        <div
          class="nyc-title x xac psr lh1-25 vh100 tac pen z3"
          style="mix-blend-mode: difference; font-size: 13vw;"
        >
          <div>
            <div>
              <div>Peer-to-Peer</div>
              <div>Peer-to-Peer</div>
            </div>
            <div>
              <div>Web / NYC</div>
              <div>Web / NYC</div>
            </div>
          </div>
        </div>

      </div>
    `
  }
}

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
