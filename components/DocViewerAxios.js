import React from 'react'
import {getDocumentParser} from './BaseDocViewer'
import axios from 'axios'

function getDocumentUrl(props) {
    console.log(`getDocumentUrl`);
    console.log(props);
    return new URL(props.appDocRoot + '/' + props.docName + '.xml', props.appBaseUrl).href
}

function getDocumentStream(props) {
    const { server } = props;
    return axios.get(getDocumentUrl(props));
}

function handleDocumentStream({server, stream, parser}) {
    parser.write(stream.data);
    parser.close();
}

export function loadDocument(props) {
    const { server } = props;
    if(server === undefined) {
	throw new Error('server undefined');
    }
    return new Promise((resolve, reject) => {
	const parser = getDocumentParser({ server, resolve, reject });
	return getDocumentStream({ server, parser, ...props })
	    .then((stream) => handleDocumentStream({ server, stream, parser }))
	    .catch(reject);
    });

}

