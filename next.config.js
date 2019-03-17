// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = { ...withSass(),
		   env: {
		       appBaseUrl: 'https://dev.kaymccormick.com',
		       appDocRoot: '/static/doc-xml',
		       
		   }
		 }
