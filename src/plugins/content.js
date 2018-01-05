var objectKeys = require('object-keys')
var xtend = require('xtend')
var path = require('path')
var xhr = require('xhr')
var fs = require('fs')

var views = require('../views')

module.exports = store

function content (state, emitter, app) {
  state.content = {
    "01-los-angeles": xtend({
      content: fs.readFileSync(path.join(__dirname, '../../assets/01-los-angeles/about.md'), 'utf8'),
      playing: false,
      video: '01-jon-kyle'
    }, require('../../assets/01-los-angeles/index.json'))
  }

  // state.events.CONTENT = 'content'
  // emitter.on(state.events.CONTENT, content)

  // function content (data) {
  //   if (!data.page || !data.data) return
  //   state.content[data.page] = xtend(state.content[data.page], data.data)
  //   if (data.render !== false) emitter.emit(state.events.RENDER)
  // }
}


function store (site) {
  return function content (state, emitter, app) {
    state.content = { }

    objectKeys(site).forEach(function (path) {
      var page = site[path] || { }
      var view = views[page.view] || views.default
      state.content[page.url] = page

      app.route(page.short || page.url, function (state, emit) {
        return view(xtend(state, { page: page }), emit)
      })
    })

    // lol
    state.content["01-los-angeles"] = xtend({
      content: fs.readFileSync(path.join(__dirname, '../../assets/01-los-angeles/about.md'), 'utf8'),
      playing: false,
      video: '01-jon-kyle'
    }, require('../../assets/01-los-angeles/index.json'))
    
    state.events.CONTENT = 'content'
    emitter.on(state.events.CONTENT, content)

    function content (data) {
      if (!data.page || !data.data) return
      state.content[data.page] = xtend(state.content[data.page], data.data)
      if (data.render !== false) emitter.emit(state.events.RENDER)
    }
  }
}
