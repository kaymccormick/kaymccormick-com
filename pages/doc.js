import React from 'react'
import Viewer from '../components/DocViewer'
import Header from '../components/Header'
import Layout from '../components/Layout'
import { loadDocumentData } from '../components/DocViewerAxios'
import { getComponentForXmlSync } from 'docutils-react/lib/getComponentForXmlSax'
import PropTypes from 'prop-types'
import './doc.scss'

class DocPage extends React.Component {
    static async getInitialProps(ctx) {
	const { req, query } = ctx;
	const defaultProps = {
	    appDocRoot: process.env.appDocRoot,
	    appBaseUrl: process.env.appBaseUrl,
	    docName: query.docName,
	};
	if(req) {
	    const server = true;
	    const result = await loadDocumentData({ ...defaultProps, server })
		  .then(data => ({ data }))
		  .catch(error => {
		      console.log(error.stack);
		      return {};
		  });
	    
	    return result
	}
	const x = { ...defaultProps, server: false }
	console.log(x);
	return x;
    }

    constructor(props) {
	super(props);
	this.state = { log: [<div>Constructed</div>] }
    }
    
    render() {
	const component = getComponentForXmlSync(this.props.data);
	///<div className="log">{this.state.log}</div><div><table>{Object.keys(props).map(p => <tr><th>{p}</th><td>{"" + props[p]}</td><td>{React.isValidElement(props[p]) ? 'react-element' : ''}</td></tr>)}</table><Viewer {...props}/></div>
	return <Layout title="Kay McCormick"><Viewer component={component} {...this.props}/>
	    </Layout>;
    }
}
DocPage.propTypes = {
    server: PropTypes.bool.isRequired,
};

export default DocPage;
