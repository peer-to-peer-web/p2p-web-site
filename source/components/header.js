var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

module.exports = class Header extends Nanocomponent {
  constructor () {
    super()

    this.frame = undefined
    this.intro = false

    this.state = {
      title: 'p2p-web-la',
      date: '12/09/17',
      rows: 10 * 1.5,
      cols: 16 * 1.5,
      text: undefined,
      visible: [],
      populated: false
    }

    this.onResize = this.onResize.bind(this)
  }

  load () {
    var self = this
    window.addEventListener('resize', this.onResize, false)
    this.setupCanvas()
    this.rerender()

    // this.intro = setInterval(function () {

    //   self.rerender()
    // }, 30)
  }

  unload () {
    window.removeEventListener('resize', this.onResize, false)
  }

  onResize () {
    var self = this
    clearTimeout(this.frame)
    this.frame = setTimeout(function () {
      self.state.visible = [ ]
      self.intro = true
      self.setupCanvas()
      self.rerender()
    }, 100)
  }

  setupCanvas () {
    var cols = Math.floor(window.innerWidth / 35)
    var rows = Math.floor(window.innerHeight / 45)
    this.state.cols = (cols % 2) ? cols + 1 : cols
    this.state.rows = (rows % 2) ? rows : rows + 1
    this.state.populated = false
  }

  insertTitle (text) {
    var title = this.state.title.split('')
    var date = this.state.date.split('')
    var rowTitle = Math.floor(text.length / 2)
    var rowDate = rowTitle + 2

    text[rowTitle] = this.textCenter(title, text[rowTitle])
    // text[rowDate] = this.textCenter(date, text[rowDate])

    return text.map(function (row, i) {
      if (i === 0 || i === text.length - 1) {
        return row.map(function (col) {
          col.active = true
          return col
        })
      } else {
        row[0].active = true
        row[row.length - 1].active = true
      }
      return row
    })
  }

  textCenter (text, row) {
    var offset = Math.floor((row.length - text.length) / 2)
    return row.map(function (char, i) {
      if (i < offset) return char
      return text[i-offset]
        ? { text: text[i-offset], visible: true, highlight: true, active: true }
        : char
    })
  }

  splitText (text, row) {
    var self = this
    return text.map(function (char, i) {
      return html`
        <div class="x xx xjc xac ${char.visible ? '' : 'op0'}" onmouseenter=${handleHover}>
          ${char.active ? char.text : (char.text === 'p') ? '-' : '-'}
        </div>
      `

      function handleHover () {
        // if (self.intro !== true) return
        var update = self.state.text[row][i]
        update.active = true
        update.text = (char.text === 'p') ? '2' : 'p'
        self.rerender()
      }
    })
  }

  splitRows (rows) {
    var self = this
    return rows.map(function(row, i) {
      return html`
        <div class="c12 x tac">
          ${self.splitText(row, i)}
        </div>
      `
    })
  }

  getRows (count) {
    var self = this
    count = count || 10
    var self = this
    return [...Array(count).keys()].map(function (row) {
      var text = (row % 2 === 0) ? 'p2' : '2p'
      return self.getText(self.state.cols, text)
    })
  }

  createElement (props) {
    if (!this.state.populated) {
      this.state.text = this.getRows(this.state.rows)
      this.state.populated = true
    }

    var content = this.insertTitle(this.state.text)

    return html`
      <div class="x xx c12 ttu lh1 curd usn psr">
        <div class="c12 x xdc xjb">
          ${this.splitRows(content)}
        </div>
      </div> 
    ` 
  }

  update (props) {
    return false
  }

  setRandomCell () {
    var col = Math.floor(Math.random() * this.state.cols)
    var row = Math.floor(Math.random() * this.state.rows)
    var id = row + ':' + col

    if (this.state.visible.length < this.state.cols * this.state.rows) {
      if (this.state.visible.indexOf(id) < 0) {
        this.state.text[row][col].visible = true
        this.state.visible.push(id)
      } else { 
        this.setRandomCell()
      }
    } else {
      clearInterval(this.intro)
      this.intro = true
    }
  }

  getText (cols, text) {
    var self = this
    cols = cols || 10
    text = text.split('') || ['h', 'i']
    return [...Array(cols).keys()].map(function (i) {
      return { text: text[i % text.length], active: false, highlight: false, visible: true }
    })
  }
}