var raw = require('bel/raw')
var Markdown = require('markdown-it')
var md = new Markdown()

module.exports = format

function format (str) {
  return raw(md.render(str || ''))
}