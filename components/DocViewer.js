import React from 'react'
import { setupSaxParser } from 'docutils-react/lib/getComponentForXmlSax'
import BaseDocViewer from './BaseDocViewer'

export default class Viewer extends React.Component {
    constructor(props) {
	super(props);
	if(prop.server) {
	} else {
	    this.docViewer = new require('./DocViewerClient');
	    this.state = { component: props.component }
	}
    }

    componentDidMount()
    {
	const {server} = this.props;
	if(this.props.component) {
	    return;
	}
	if(!server) {
	    this.docViewer.loadDocument({server, docName: this.props.docName, baseHref: this.props.baseHref })
		.then(({component}) => this.setState({component}))
		.catch(err => console.log(err.stack));
	}
    }

    render() {
	return React.isValidElement(this.state.component) ? this.state.component : null;
    }
}
