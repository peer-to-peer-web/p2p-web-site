var fromString = require('from2-string')
var hyperstream = require('hyperstream')
var manifest = require('../../manifest.json')

module.exports = transform

function transform (opts) {
  var header = `
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="http://peer-to-peer-web.com/los-angeles">
    <meta name="twitter:title" content="${manifest.name}">
    <meta name="twitter:description" content="${manifest.description}">
    <meta name="twitter:creator" content="@jondashkyle">
    <meta name="twitter:image" content="${manifest.twitter}">
  `.replace(/\n +/g, '')

  return hyperstream({
    head: {
      _appendHtml: header
    }
  })
}
