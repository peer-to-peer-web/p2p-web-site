var Nanocomponent = require('nanocomponent')
var Flickity = require('flickity-bg-lazyload')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Slideshow extends Nanocomponent {
  constructor () {
    super()
    this.state = {
      rightToLeft: false,
      autoPlay: 3000,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      pauseAutoPlayOnHover: false,
      resize: true,
      accessibility: false,
      bgLazyLoad: 1
    }
  }

  resize () {
    if (this.slideshow) {
      this.slideshow.resize()
      this.slideshow.reposition()
    }
  }

  load (element) {
    this.slideshow = new Flickity(element, this.state)
    window.addEventListener('resize', this.resize, false)
  }

  unload () {
    if (this.slideshow) {
      window.removeEventListener('resize', this.resize, false)
      this.slideshow.destroy()
    }
  }

  createElement (props) {
    this.state = xtend(this.state, props)
    return html`
      <div class="psa t0 l0 r0 b0">
        ${props.images.map(function (img) {
          return html`<div
            class="carousel-cell w100 h100 bgsc bgrn bgpc"
            data-flickity-bg-lazyload="${img.url}"
          ></div>`
        })}
      </div>
    `
  }

  update () {
    return false
  }
}
