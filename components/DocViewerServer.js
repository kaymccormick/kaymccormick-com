import React from 'react'
import { setupSaxParser} from 'docutils-react/lib/getComponentForXmlSax'
import BaseDocViewer from './BaseDocViewer'

export default class DocViewerServer extends BaseDocViewer {
    handleDocumentStream({ server, stream, parser}) {
	if(!parser) {
	    throw new Error("Need parser");
	}
	stream.setEncoding('utf8');
	stream.on('readable', () => Viewer.nodeStreamReader(stream, parser));
	return new Promise((resolve, reject) => {
	    stream.on('end', () => { parser.close(); resolve({o: true});});
	});
    }

    loadDocument(props) {
	const { server } = props;
	return new Promise((resolve, reject) => {
	    const parser = Viewer.getDocumentParser({ server, resolve, reject });
	    Viewer.getDocumentStream({ server, parser, ...props })
		.then((stream) => Viewer.handleDocumentStream({ server, stream, parser }))
		.catch(reject);
	});
    }

    getDocumentUrl(props) {
    }
}

