import React from 'react'
import { setupSaxParser} from 'docutils-react/lib/getComponentForXmlSax'
import BaseDocViewer from './BaseDocViewer'

function getDocumentStream(props) {
    return Promise.resolve(props.createReadStream(props.docPath + '/' + props.docName + '.xml'));
}

function nodeStreamReader(stream, parser) {
    let chunk;
    while(null !== (chunk = stream.read())) {
	// console.log(chunk);
        parser.write(chunk);
    }
}

function handleDocumentStream({ server, stream, parser}) {
    if(!parser) {
	throw new Error("Need parser");
    }
    stream.setEncoding('utf8');
    stream.on('readable', () => nodeStreamReader(stream, parser));
    return new Promise((resolve, reject) => {
	stream.on('end', () => { parser.close(); resolve({o: true});});
    });
}

async function loadDocument(props) {
    const { server } = props;
    return new Promise((resolve, reject) => {
	const parser = BaseDocViewer.getDocumentParser({ server, resolve, reject });
	return getDocumentStream({ server, parser, ...props })
	    .then((stream) => handleDocumentStream({ server, stream, parser }))
	    .catch(reject);
    });
}

function getDocumentUrl(props) {
}

export default {
    handleDocumentStream,
    loadDocument,
    getDocumentUrl,
    getDocumentParser: BaseDocViewer.getDocumentParser,
};

