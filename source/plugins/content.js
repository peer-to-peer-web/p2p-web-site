var objectKeys = require('object-keys')
var xtend = require('xtend')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')

var views = require('../views')

module.exports = store

function store () {
  return function content (state, emitter, app) {
    state.custom = { }

    // lol
    state.custom['/los-angeles/2017-12-10'] = require('../../content/los-angeles/2017-12-10/index.json')
    state.custom['/berlin/2018-02-10'] = makeBerlin()

    state.events.CUSTOM = 'custom'
    emitter.on(state.events.CUSTOM, custom)

    function custom (data) {
      if (!data.page || !data.data) return
      state.custom[data.page] = xtend(state.custom[data.page], data.data)
      if (data.render !== false) emitter.emit(state.events.RENDER)
    }
  }
}

function makeBerlin () {
  var state = {
    playing: false,
    video: "cade",
    "videos": {
      "mathias": {
        "id": 1,
        "title": "Mathias Buus Madsen",
        "text": "",
        "time": "Coming soon",
        "public": false
      },
      "cade": {
        "id": 2,
        "title": "Cade Diehm",
        "text": "",
        "time": "29:15"
      },
      "louis": {
        "id": 3,
        "title": "Louis Center",
        "text": "",
        "time": "43:56"
      }
    }
  }

  var images = [ ]

  Array(9).fill(null).forEach(function (num, i) {
    images.push({ url: `/content/berlin/2018-02-10/images/sv${i+1}.png` })
  })

  Array(10).fill(null).forEach(function (num, i) {
    images.push({ url: `/content/berlin/2018-02-10/images/a${i+1}.png` })
  })

  Array(10).fill(null).forEach(function (num, i) {
    images.push({ url: `/content/berlin/2018-02-10/images/g${i+1}.png` })
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
