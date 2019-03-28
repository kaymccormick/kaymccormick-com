import React from 'react'

import Header from '../components/Header'
import Layout from '../components/Layout'
import axios from 'axios'

export default class extends React.Component {
    static async getInitialProps({req}) {
	if(req) {
	    const https = require('https');
	    const url = new URL('/v1/objects/services', req.appConfig.icinga2.endpoint).href    
	    const httpsAgent = https.Agent({ ca: [ req.customCaCrt ] });
	    const response = await axios.get(url, { httpsAgent, auth: req.appConfig.icinga2.auth });
	    return { data: response.data };
	}
	return {}
    }
    
    constructor(props) {
	super(props);
	this.state = { services: props.data ? props.data.results : [] }
    }
    
    comonentDidMount() {
	axios.get('/icinga2').then(response => {
	    this.setState( { services: response.data.results });
	}).catch(err => console.log(err.stack));
    }
    render() {
	return <Layout title="Kay McCormick"><div>System status</div>{this.state.services.map(service => <div key={service.attrs.__name}><div className="displayName">{service.attrs.display_name}</div></div>)}</Layout>;

    }
}

    
    
