var html = require('choo/html')

var remap = {
  '/la': '/01-los-angeles',
  '/berlin': '02-berlin',
  '/nyc': '/03-nyc'
}

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    if (!state.site.loaded) return html`<body></body>`
    var page = state.content[remap[state.href] || state.href || '/']
      
    return html`
      <body
        class="ff-sans lh1-5 fs1 ${page.invert === true ? 'bgc-black fc-white' : 'bgc-white fc-black'}"
      >
        ${view(state, emit)}
      </body>
    `
  }
}
