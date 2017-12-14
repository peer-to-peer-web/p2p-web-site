var choo = require('choo')
require('./src/design')

var app = choo()

app.use(require('./src/plugins/content'))
app.use(require('./src/plugins/ui'))

app.route('/', require('./src/views/main'))
app.route('/los-angeles', require('./src/views/la'))

if (module.parent) module.exports = app
else app.mount('body')
