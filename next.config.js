// next.config.js
var fs = require('fs');
var path = require('path')
var sourceDir = path.resolve(__dirname, 'static/doc-xml')

function processRecursively(dir, files) {
    var x
    if(dir.endsWith('.xml')) {
	files.push(path.relative(sourceDir, dir))
    }
    try
    {
	for(x of fs.readdirSync(dir)) {
	    processRecursively(path.resolve(dir, x), files)
	}
    }catch(err) {
    }
}

var files = []
processRecursively(sourceDir, files)
console.log(files)

const withSass = require('@zeit/next-sass')
module.exports = { ...withSass(),
		   exportPathMap: async function(defaultPathMap) {
		       var docName;
		       var r = {
			   '/': { page: '/'},
			   '/error': { page: '/errorPage' },
			   '/dev': { page: '/dev'},
		       }
		       for(docName of files) {
			   docName =docName.substring(0, docName.length - 4)
			   console.log(docName)
			   r[`/doc/${docName}`] = { page: '/doc',
					       query: { docName} }
		       }
		       return r;
		   },

		   env: {
		       appBaseUrl: 'https://dev.kaymccormick.com',
		       appDocRoot: '/static/doc-xml',
		       
		   }
		 }
