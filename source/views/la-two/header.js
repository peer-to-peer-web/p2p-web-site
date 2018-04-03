var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var pm = require('popmotion')

module.exports = class Header extends Nanocomponent {
  constructor (name) {
    super(name)
    this.handleMouseMove = this.handleMouseMove.bind(this)
  }

  load (element) {
    var self = this
    var imageold = this.element.querySelector('img[data-la2-old]')
    var imagenew = this.element.querySelector('img[data-la2-new]')
    var imageXY = pm.value({ x: window.innerWidth / 2, y: 0 }, updateImage)

    this.posx = window.innerWidth / 2

    this.activeAction = pm.physics({
      velocity: imageXY.getVelocity(),
      friction: 0.6,
      springStrength: 400,
      to: getXY,
      restSpeed: false
    }).start(updateImage)

    this.pointerTracker = pm.pointer({ x: window.innerWidth / 2, y: 0 })
      .start((v) => self.activeAction.setSpringTarget(getXY()))

    // listeners
    this.activeAction.setSpringTarget(getXY())
    window.addEventListener('mousemove', this.handleMouseMove, false)

    function updateImage (v) {
      imageold.style.clipPath = `inset(0 0 0 ${v.x - 1}px)`
      imagenew.style.clipPath = `inset(0 ${window.innerWidth - v.x}px 0 0)`
    }

    function getXY () {
      return ({ x: self.posx, y: 0 })
    }
  }

  unload (element) {
    if (this.activeAction) this.activeAction.stop()
    if (this.pointerTracker) this.pointerTracker.stop()
    window.removeEventListener('mousemove', this.handleMouseMove, false)
  }

  handleMouseMove (event) {
    this.posx = event.clientX
  }

  createElement (props) {
    return html`
      <div class="psa t0 l0 r0 b0" style="cursor: ew-resize;">
        <img data-la2-new src="${props.imageOld}" class="psa t0 l0 r0 b0 h100 w100 ofc pen">
        <img data-la2-old src="${props.imageNew}" class="psa t0 l0 r0 b0 h100 w100 ofc pen" style="clip-path: inset(0 50% 0 0)">
      </div>
    `
  }

  update (props) {
    return false
  }
}
