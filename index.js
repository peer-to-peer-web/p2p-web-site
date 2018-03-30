var choo = require('choo')
require('./src/design')

var app = choo()

app.use(require('enoki/choo')())
// app.use(require('./src/plugins/content')(site))
app.use(require('./src/plugins/ui'))

app.route('/', require('./src/views/main'))
app.route('/los-angeles', require('./src/views/la'))
app.route('/berlin', require('./src/views/berlin'))
app.route('/nyc', require('./src/views/nyc'))
app.route('/coc', require('./src/views/coc'))

if (!module.parent) app.mount('body')
else module.exports = app
