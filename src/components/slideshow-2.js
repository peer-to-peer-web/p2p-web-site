var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var xtend = require('xtend')

module.exports = class Slideshow extends Nanocomponent {
  constructor () {
    super()
    this.loop
    this.slide = 0
    this.state = {

    }
  }

  load (element) {

  }

  unload () {
    // clearInterval(this.loop)
  }

  createElement (props) {
    this.state = xtend(this.state, props)
    var width = (props.images.length) * 100
    return html`
      <div
        class="x"
        style="height: 100%; width: ${width}%"
      >
        ${props.images.map(function (img) {
          return html`
            <div class="xx">
              <img
                class="db h100 w100 ofc"
                src="${img.url}"
              >
            </div>
          `
        })}
      </div>
    `
  }

  update (props) {
    this.state.trigger = props.trigger
    return false
  }
}
