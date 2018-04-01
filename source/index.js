var choo = require('choo')
require('./design')

var app = choo()

app.use(require('enoki/choo')())
app.use(require('./plugins/ui'))
app.use(require('./plugins/content')())

app.route('/', require('./views/main-two'))
app.route('/coc', require('./views/coc'))
app.route('/:city', require('./views/city'))

app.route('/nyc', require('./views/nyc'))

app.route('/los-angeles/2017-12-10', require('./views/la'))
app.route('/berlin/2018-02-10', require('./views/berlin'))

if (!module.parent) app.mount('body')
else module.exports = app
