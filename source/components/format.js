var raw = require('choo/html/raw')
var Markdown = require('markdown-it')
var md = new Markdown({
  html: true,
  typographer: true
})

module.exports = format

function format (str) {
  return raw(md.render(str || ''))
}