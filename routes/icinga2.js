

const express = require('express');
const router = express.Router();
const axios = require('axios')
const https = require('https');
const fs = require('fs')
const path = require('path');

/* GET users listing. */
router.get('/icinga2', async function(req, res, next) {
    const url = new URL('/v1/objects/services', req.appConfig.icinga2.endpoint).href    
    const httpsAgent = https.Agent({ ca: [ req.customCaCrt ] });
    return axios.get(url,
		     { httpsAgent, auth: req.appConfig.icinga2.auth })
	.then(response => response.data).
	then(data => JSON.stringify(data)).then(s => {
	    res.send(s);
	})
	.catch(error => {
	    console.log(error.stack);
	    next();
	});
});

module.exports = router;
