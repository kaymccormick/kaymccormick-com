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

    static async loadDocument(props) {
	const { server } = props;
	return new Promise((resolve, reject) => {
	    const parser = Viewer.getDocumentParser({ server, resolve, reject });
	    Viewer.getDocumentStream({ server, parser, ...props })
		    .then((stream) => Viewer.handleDocumentStream({ server, stream, parser }))
		    .catch(reject);
	});
    }
    
/*
    static async getInitialProps({req}) {
	if(req) {
	    const server = true;
	    const docViewer = new require('./DocViewerServer');
	    return docViewer.loadDocument({server, docName: 'index'});
	}
	return Promise.resolve({ server: false });
    }
*/

    componentDidMount()
    {
	const {server} = this.props;
	if(this.props.component) {
	    return;
	}
	if(!server) {
	    console.log('here')
	    Viewer.loadDocument({server, docName: this.props.docName, baseHref: this.props.baseHref })
		.then(({component}) => this.setState({component}))
		.catch(err => console.log(err.stack));
	}
    }

    static getDocumentUrl(props) {
	return new URL(`/static/xml/${props.docName}.xml`, props.baseHref)

    }

    static nodeStreamReader(stream, parser) {
	let chunk;
	while(null !== (chunk = stream.read())) {
	    // console.log(chunk);
            parser.write(chunk);
	}
    }

    static async processWebStream({ stream, parser }) {
	while(true) {
            const { done, value } = await stream.read();
            if(done) {
		break;
            }
            const val = new TextDecoder("utf-8").decode(value);
//	    console.log(val);
	    parser.write(val);
	}
    }
	
    static handleWebStream({stream, parser}) {
	Viewer.processWebStream({stream, parser}).then(() => {
	    stream.releaseLock();
	    parser.close();
	})
    }
    
    static handleNodeStream({stream, parser}) {
	if(!parser) {
	    throw new Error("Need parser");
	}
	stream.setEncoding('utf8');
	stream.on('readable', () => Viewer.nodeStreamReader(stream, parser));
	return new Promise((resolve, reject) => {
	    stream.on('end', () => { parser.close(); resolve({o: true});});
	});
    }
    
    static handleDocumentStream(props) {
	const { server, stream, parser } = props;
	if(server) {
	    return Viewer.handleNodeStream({stream, parser});
	} else {
	    return Viewer.handleWebStream({stream, parser});
	}
    }

    static getDocumentParser({ server, resolve, reject }) {
	const context = {};
	const { parser } = setupSaxParser({context});
	parser.onend = () => {
	    const nodes = context.siblings[0].map(f => f());
	    const r = nodes.filter(React.isValidElement)[0];
	    if(!React.isValidElement(r)) {
		reject(new Error("Invalid Element"));
	    }
	    const data = context.nodes[0].dataChildren.map(f => f()).filter(e => e[0] === 'document')[0];
	    resolve({ component: r });
	};
	return parser;
    }

    static getDocumentStream(props) {
	const url = Viewer.getDocumentUrl(props);
	let fetch;
	if(props.server) {
	} else {
	    fetch = window.fetch;
	}
        return fetch(url).then(
	    response => {
		if(!response.ok) {
		    throw new Error(`Unable to retreieve URL ${url}`);
		}
		return response;
	    }).then(response => {
		if(props.server) {
		    return response.body;
		} else {
		    return response.body.getReader();
		}
	    });
    }

    render() {
	return React.isValidElement(this.state.component) ? this.state.component : null;
    }
}
