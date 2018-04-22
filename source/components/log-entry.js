var html = require('choo/html')
var format = require('./format')

module.exports = logEntry

function logEntry (state, emit, props) {
  var date = props.date.split('-').splice(1, 2).join('/')
  return html`
    <div id="log-${props.name}" class="b1-black w100 copy-width m1">
      <div class="x xjb w100 p1 lh1">
        <div><a href="${props.url}">${props.title}</a></div>
        <div class="ff-mono">${date}</div>
      </div>
      <div class="bb1-black mx1"></div>
      <div class="p1 copy copy-simple lh1-5">
        ${format(props.text)}
      </div>
    </div>
  `
}
