var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    if (!state.site.loaded) return html`<body></body>`
    var page = state.content[state.href || '/'] || { }
      
    return html`
      <body class="ff-sans lh1-5 fs1 ${page.invert === true ? 'bgc-black fc-white' : 'bgc-white fc-black'}">
        ${view(state, emit)}
      </body>
    `
  }
}
