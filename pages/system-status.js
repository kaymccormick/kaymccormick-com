import React from 'react'

import Header from '../components/Header'
import Layout from '../components/Layout'
import axios from 'axios'

export default class extends React.Component {
    constructor(props) {
	super(props);
	this.state = { services: [] }
    }
    
    comonentDidMount() {
	axios.get('/icinga2').then(response => {
	    this.setState( { services: response.data });
	}).catch(err => console.log(err.stack));
    }
    render() {
	return <Layout title="Kay McCormick"><div>System status</div>{this.state}</Layout>;

    }
}

    
    
