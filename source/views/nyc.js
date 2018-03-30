var objectKeys = require('object-keys')
var html = require('choo/html')

var wrapper = require('../components/wrapper')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div>hi</div>
  `
}
