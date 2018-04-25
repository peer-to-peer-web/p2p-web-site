var Nanocomponent = require('nanocomponent')
var Tweezer = require('tweezer.js')
var imgload = require('imgload')
var html = require('choo/html')
var xtend = require('xtend')
var css = require('sheetify')

module.exports = class Slideshow extends Nanocomponent {
  constructor () {
    super()
    this.loop
    this.state = {
      active: false,
      trigger: false,
      index: 0,
      delay: 2000
    }

    this.handleClick = this.handleClick.bind(this)
  }

  load (element) {
    this.state.active = true
    this.progress()
  }

  unload (element) {
    var children = [...element.children]
    clearTimeout(this.loop)
    children.forEach(child => {
      if (child) element.removeChild(child)
    })
  }

  createElement (props) {
    this.state = xtend(this.state, props)
    var width = (props.images.length) * 100

    // placeholder
    if (!this.state.active) return html`<div></div>`

    return html`
      <div class="h100 w100 psr"></div>
    `
  }

  renderImage (props) {
    var translate = props.translate || 0
    return html`
      <img
        class="db h100 w100 ofc psa t0 l0 r0 b0 pixelate"
        style="opacity: 0;"
        src="${props.image.url}"
        onclick=${this.handleClick}
      >
    `
  }

  progress () {
    var self = this

    if (typeof this.element === 'undefined') {
      return clearTimeout(this.loop)
    }

    var reverse = this.state.reverse
    this.state.index = (this.state.index + 1) % this.state.images.length
    var next = (this.state.index + 1) % this.state.images.length 
    var children = [...this.element.children]

    var elFresh = this.renderImage({
      image: this.state.images[this.state.index]
    })

    var transition = new Tweezer({
      start: 1000,
      end: 0,
      duration: 1000
    }).on('tick', function (value) {
      value = value / 10
      elFresh.style.transform = `translate3d(${reverse ? value : value * -1}%, 0, 0)`
    }).begin()

    this.element.appendChild(elFresh)
    setTimeout(() => { elFresh.style.opacity = 1 }, 0)
    imgload(this.state.images[next].url).start()

    if (typeof this.state.select === 'function') {
      this.state.select(this.state)
    }

    clearTimeout(this.loop)
    this.loop = setTimeout(() => {
      this.progress()
      if (children.length > 2) {
        children.slice(0, children.length - 1).forEach(function (child) {
          if (child.parentNode === self.element) self.element.removeChild(child)
        })
      }
    }, this.state.delay)
  }

  handleClick (event) {
    this.progress()
  }

  update (props) {
    this.state.trigger = props.trigger
    return false
  }
}
