var objectValues = require('object-values')

var date = new Date()

module.exports = {
  upcoming: upcoming,
  previous: previous
}

function upcoming (value) {
  try {
    return objectValues(value).filter(function (page) {
      return new Date(page.date) >= date
    })
  } catch (err) {
    return [ ]
  }
}

function previous (value) {
  try {
    return objectValues(value).filter(function (page) {
      return new Date(page.date) < date
    })
  } catch (err) {
    return [ ]
  }
}
