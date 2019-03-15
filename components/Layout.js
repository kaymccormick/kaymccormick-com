import React from 'react'

import Header from '../components/Header'

const sectionBackgroundColor = '#f4cd14'
//ab8f0e
const Section = (props) => <div style={{ border: '2px groove #ab8f0e',
					 fontSize: '200%',
					 display: 'inline-block',
					 backgroundColor: sectionBackgroundColor,
				       paddingLeft: '1em',
				       paddingRight: '1em' }}>{props.title}</div>;

const siteSections = { 'Software': { },
		       'Personal': { },
		     'Seattle': { },}

export default (props) => <Header>
    {Object.keys(siteSections).map(section => <Section key={section} title={section}/>)}
</Header>
    
    
