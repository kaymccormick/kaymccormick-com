import React from 'react'
import Viewer from '../components/DocViewer'
import Header from '../components/Header'
import Layout from '../components/Layout'

export default class extends React.Component {
    static async getInitialProps({req}) {
	if(req) {
	    const docViewer = require('../components/DocViewerServer').default;
	    const server = true;
	    if(docViewer.loadDocument) {
		return docViewer.loadDocument({createReadStream: req.createReadStream, server, docName: 'index'}).catch(error => {
		    console.log(error.stack);
		    return {};
		}).then(() => {
		    return { };
		});

	    }
	    console.log(docViewer);
	    return {}

	}
	return Promise.resolve({ server: false });
    }
    
    render() {
	return <Layout title="Kay McCormick">
	    <Viewer {...this.props}/>
	    </Layout>;
    }
}


    
    
