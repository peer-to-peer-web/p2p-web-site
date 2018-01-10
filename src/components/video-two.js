var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var plyr = require('plyr')

css('plyr/dist/plyr.css')

module.exports = class Video extends Nanocomponent {
  constructor () {
    super()

    this.state = {
      src: ''
    }
  }

  load (element) {
    var self = this
    // this.player = plyr.setup(element.querySelector('video'))
    setTimeout(() => {
      self.player = plyr.setup(element.querySelector('video'))
    }, 2000)
  }

  createElement (props) {
    this.state.src = props.src
    return html`
      <div class="fc-white">
        <div>hi</div>
        <video poster="/path/to/poster.jpg" controls>
          <source src="${props.src}" type="video/mp4">
        </video>
      </div>
    `
  }

  update (props) {
    if (props.src !== this.state.src) {
      this.state.src = props.src
      console.log(this.player)
      if (this.player) {
        this.player[0].source({
          type: 'video',
          sources: [{
            src: props.src,
            type: 'video/mp4'
          }]
        })
      }
    }
    return false
  }
}
