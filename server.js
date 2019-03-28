#!/usr/bin/node

const express = require('express')
const next = require('next')
const logger = require('morgan');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const appConfig = require('./kaymccormick-com.config').default;
const fs = require('fs');

const customCaCrt = fs.readFileSync(appConfig.customCaCertPath);
if(!customCaCrt) {
    throw new Error("Fail");
}

const icinga2Router = require('./routes/icinga2')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    server.use(cookieParser());
    server.use((req, res, next) => {
	const appFlags = {};
	if('user-agent' in req.headers && req.headers['user-agent'].indexOf('check_http') == 0) {
	    appFlags.isHttpCheck = true;
	}
	req.appFlags = appFlags;
	req.appConfig = appConfig;
	req.customCaCrt = customCaCrt;
	next();
    });
    server.use(logger(dev ? 'dev' : 'combined', { skip: (req, res) => {
	return req.appFlags.isHttpCheck;
    } }));

    server.get('/doc/*', (req, res) => {
	const docName = req.path.substring(5);
	console.log(`docname is ${docName}`);
	app.render(req, res, '/doc', { docName })
    })

    server.use(icinga2Router);
	       
    server.get('*', (req, res) => {
	return handle(req, res)
    })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
