var html = require('choo/html')

module.exports = navigation

function navigation (props) {
  props = props || { }
  return props.links
}