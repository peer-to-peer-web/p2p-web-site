var choo = require('choo')
require('./design')

var app = choo()

app.use(require('enoki/choo')())
app.use(require('./plugins/ui'))
app.use(require('./plugins/content')())
app.use(require('./plugins/livestream')())

app.route('*', require('./views/wrapper'))

if (!module.parent) app.mount('body')
else module.exports = app
