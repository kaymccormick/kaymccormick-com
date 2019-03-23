import React from 'react'

import Layout from '../components/Layout'

export default class Index extends React.Component {
    static async getInitialProps({req}) {
	if(req) {
	    return { HEPTETSRV: req.cookies ? req.cookies.HEPTETSRV: null };
	}
	return {}
    }
    
    render() {
	return <Layout title="Kay McCormick"><div>Main page with server cookie {this.props.HEPTETSRV}</div></Layout>;
    }
}

    
    
