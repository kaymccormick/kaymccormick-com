import React from 'react'
import { setupSaxParser } from 'docutils-react/lib/getComponentForXmlSax'
import { loadDocument } from './DocViewerAxios'

export default class Viewer extends React.Component {
    constructor(props) {
	super(props);
	this.state = { component: props.component }
    }

    componentDidMount()
    {
	const server = this.props.server;
	if(this.state.component && React.isValidElement(this.state.component)) {
	    return;
	}
	if(!server) {
	    loadDocument({server,
			  docName: this.props.docName,
			  appDocRoot: process.env.appDocRoot,
			  appBaseUrl: process.env.appBaseUrl,
			 }).then(({component}) => this.setState({component})).catch(err => console.log(err.stack));
	}
    }

    render() {
	return React.isValidElement(this.state.component) ? this.state.component : null;
    }
}
