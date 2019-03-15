/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Head from 'next/head'

import Header from '../components/Header'

const sectionBackgroundColor = '#f4cd14'
//ab8f0e
const Section = (props) => <button onClick={() => console.log('click')} css={{ '&:hover': { backgroundColor: '#ab8f0e',
						  },
				       border: '2px groove #ab8f0e',
				       fontSize: '200%',
				       // display: 'inline-block',
				       margin: '.33rem',
				       backgroundColor: sectionBackgroundColor,
				       paddingLeft: '1em',
				       paddingRight: '1em' }}><span>{props.title}</span></button>;

const Navigation = (props) => <nav css={{ borderStyle: 'inset',
					  borderWidth: '2px',
					  borderColor: sectionBackgroundColor,
					  width: 'fit-content',
					  padding: '.3rem',
					  backgroundColor: '#f4da5e'}}>{props.children}</nav> 

const siteSections = { 'Software': { },
		       'Personal': { },
		       'Seattle': { },}

export default (props) => <div>
    <Head>
    <title>{props.tite}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navigation>
    {Object.keys(siteSections).map(section => <Section key={section} title={section}/>)}
</Navigation></div>
    
