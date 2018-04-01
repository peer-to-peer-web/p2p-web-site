var hypha = require('hypha')
var path = require('path')
var fs = require('fs')

try {
  var site = hypha.readSiteSync('../content')
  fs.writeFileSync(
    path.join(__dirname, '../../bundles/content.json'),
    JSON.stringify(site)
  )
  console.log('content.json saved')
} catch (err) {
  console.log('content.json can not be saved')
  console.warn(err)
}
