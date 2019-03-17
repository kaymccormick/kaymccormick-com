import React from 'react'
import Viewer from '../components/DocViewer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { loadDocument } from '../components/DocViewerAxios'
import PropTypes from 'prop-types'

class DocPage extends React.Component {
    static async getInitialProps({req}) {
	const defaultProps = {
	    appDocRoot: process.env.appDocRoot,
	    appBaseUrl: process.env.appBaseUrl,
	    docName: 'index',
	};
	if(req) {
	    const server = true;
	    const result = await loadDocument({ ...defaultProps,
		server }).catch(error => {
		    console.log(error.stack);
		    return {};
		});
	    
	    return result
	}
	const x = { ...defaultProps, server: false }
	console.log(x);
	return x;
    }
    
    render() {
	const props = { ...this.props}
	if(props.server === undefined) {
	    props.server = false;
	}
	return <Layout title="Kay McCormick">
	    <Viewer {...props}/>
	    </Layout>;
    }
}
DocPage.propTypes = {
    server: PropTypes.bool.isRequired,
};

export default DocPage;
