var Nanocomponent = require('nanocomponent')
var Flickity = require('flickity-bg-lazyload')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Slideshow extends Nanocomponent {
  constructor () {
    super()
    this.state = {
      trigger: false,
      rightToLeft: false,
      autoPlay: 3000,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      pauseAutoPlayOnHover: false,
      resize: false,
      accessibility: false,
      bgLazyLoad: 1
    }

    this.resizeTimeout
    this.handleSettle = this.handleSettle.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.resize = this.resize.bind(this)
}

  resize () {
    var self = this
    clearTimeout(this.resizeTimeout)
    this.resizeTimeout = setTimeout(function () {
      if (self.slideshow && self.slideshow.resize && self.slideshow.position) {
        self.slideshow.resize()
        // self.slideshow.position()
      }
    }, 500)
  }

  load (element) {
    this.slideshow = new Flickity(element, this.state)
    this.slideshow.on('select', this.handleSelect)
    this.slideshow.on('settle', this.handleSettle)
    window.addEventListener('resize', this.resize, false)
    this.resize()
  }

  unload () {
    if (this.slideshow) {
      window.removeEventListener('resize', this.resize, false)
      this.slideshow.off('select', this.handleSelect)
      this.slideshow.off('settle', this.handleSettle)
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

  handleSelect (event) {
    if (typeof this.state.select === 'function' && this.state.trigger) {
      this.state.select(this.slideshow)
    }
  }

  handleSettle (event) {
    if (typeof this.state.settle === 'function'  && this.state.trigger) {
      this.state.settle(this.slideshow)
    }
  }

  update (props) {
    this.state.trigger = props.trigger
    return false
  }
}
