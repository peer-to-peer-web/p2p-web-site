var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <body class="ff-sans bgc-white fc-black lh1-5 fs1">
        ${view(state, emit)}
      </body>
    `
  }
}
