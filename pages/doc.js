import React from 'react'
import Viewer from '../components/DocViewer'
import Header from '../components/Header'
import Layout from '../components/Layout'

export default class extends React.Component {
    static async getInitialProps({req}) {
	if(req) {
	    const DocViewerServer = new require('../components/DocViewerServer');
	    const server = true;
	    return docViewer.loadDocument({server, docName: 'index'});
	}
	return Promise.resolve({ server: false });
    }
    
    render() {
	return <Layout title="Kay McCormick">
	    <Viewer {...this.props}/>
	    </Layout>;
    }
}


    
    
