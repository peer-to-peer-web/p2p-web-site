var choo = require('choo')
require('./design')

var app = choo()

app.use(require('enoki/choo')())
app.use(require('./plugins/ui'))
app.use(require('./plugins/content')())

app.route('/', require('./views/main'))
app.route('/los-angeles', require('./views/la'))
app.route('/berlin', require('./views/berlin'))
app.route('/nyc', require('./views/nyc'))
app.route('/coc', require('./views/coc'))

if (!module.parent) app.mount('body')
else module.exports = app
