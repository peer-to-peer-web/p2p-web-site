var hypha = require('hypha')
var choo = require('choo')
require('./src/design')

var app = choo()
var site = hypha.readSiteSync('./content', {
  parent: 'content'
})

app.use(require('./src/plugins/content')(site))
app.use(require('./src/plugins/ui'))

// app.route('/', require('./src/views/main'))
// app.route('/los-angeles', require('./src/views/la'))

if (!module.parent) app.mount('body')
else module.exports = app
