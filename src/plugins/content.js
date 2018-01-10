var objectKeys = require('object-keys')
var xtend = require('xtend')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')

var views = require('../views')

module.exports = store

function store (site) {
  return function content (state, emitter, app) {
    state.content = { }

    // lol
    state.content['/01-los-angeles'] = makeLosAngeles()
    state.content['/02-berlin'] = xtend(state.content['/02-berlin'], makeBerlin())

    objectKeys(site).forEach(function (path) {
      var page = site[path] || { }
      var view = views[page.view] || views.default
      state.content[page.url] = xtend(page, state.content[page.url])

      // app.route(page.short || page.url, function (state, emit) {
      //   return view(xtend(state, { page: state.content[page.url] }), emit)
      // })
    })

    state.events.CONTENT = 'content'
    emitter.on(state.events.CONTENT, content)

    function content (data) {
      if (!data.page || !data.data) return
      state.content[data.page] = xtend(state.content[data.page], data.data)
      if (data.render !== false) emitter.emit(state.events.RENDER)
    }
  }
}

function makeLosAngeles () {
  return xtend(
    {
      content: fs.readFileSync(path.join(__dirname, '../../assets/01-los-angeles/about.md'), 'utf8'),
      playing: false,
      video: '01-jon-kyle'
    },
    require('../../assets/01-los-angeles/index.json')
  )
}

function makeBerlin () {
  var state = { }

  var images = [ ]

  Array(9).fill(null).forEach(function (num, i) {
    images.push({ url: `/assets/02-berlin/sv${i+1}.png` })
  })

  Array(10).fill(null).forEach(function (num, i) {
    images.push({ url: `/assets/02-berlin/a${i+1}.png` })
  })

  Array(10).fill(null).forEach(function (num, i) {
    images.push({ url: `/assets/02-berlin/g${i+1}.png` })
  })

  state.imgLeft = shuffle(images.slice(0))
  state.imgRight = shuffle(images.slice(0))
  state.playing = false

  return state
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}