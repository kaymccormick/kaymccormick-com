import React from 'react'
import { setupSaxParser} from 'docutils-react/lib/getComponentForXmlSax'

function getDocumentUrl(props) {
    return new URL(`/static/xml/${props.docName}.xml`, props.baseHref)
}


async function processWebStream({ stream, parser }) {
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

function handleDocumentStream({ server, stream, parser}) {
    processWebStream({stream, parser}).then(() => {
	stream.releaseLock();
	parser.close();
    })
}

function loadDocument(props) {
    const { server} = props;
}
