

var express = require('express');
var router = express.Router();
var axios = require('axios')
//curl -v -u root:4733bcadff33ab0e --cacert cacert.pem https://cerberus:5665/v1/objects/hosts | json_pp | less

router.get('/icinga2/badService', async function(req, res, next) {
    const url = `https://cerberus:5665/v1/objects/service?filter=service.state!=ServiceOK
`
    return axios.get(url,
		     { /*httpsAgent: agent, */
			 auth: { username: 'root', password: '4733bcadff33ab0e' } })
	.then(response => response.data).
	then(data => {
	    console.log(data);
	    return JSON.stringify(data.results.map(o => o.name));
	}).then(s => {
	    res.send(s);
	})
	.catch(error => {
	    res.send(error.stack);
	    console.log(error.stack);
	});
});

module.exports = router;
