import React from 'react'
import { setupSaxParser} from 'docutils-react/lib/getComponentForXmlSax'

export default class BaseDocViewer {
    getDocumentParser({ server,resolve, reject }) {
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
    
}
