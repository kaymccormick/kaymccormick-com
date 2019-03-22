/** @jsx jsx */
/* This file is kind of misnamed ??*/
import { jsx } from '@emotion/core'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Structure from './Structure'
import Header from './Header'
import PropTypes from 'prop-types'


const Section = (props) => <div className="nav1__section"><Link href={props.href}><a>{props.title}</a></Link></div>;
const Navigation = (props) => <nav className="nav1">{props.children}</nav> 

const siteSections = { 'Development': { href: '/dev' },
		       'Social': { href: '/social' },
		       'Seattle': { href: '/seattle' },}

class Layout extends React.Component {
    render() {
	const headerArea = <header><div className="font2" css={{ paddingLeft: '5em', fontSize: '48pt' }}>{this.props.headerTitle||'Kay McCormick'}</div></header>;
	const navigationArea = <Navigation>{Object.keys(siteSections).map(section => <Section key={section} title={section} {...siteSections[section]}/>)}</Navigation>;
	return <div>
	    <Head>
	    <link rel="stylesheet" href="https://use.typekit.net/djs7szq.css"/>
	    <title>{this.props.pageTitle || this.props.title}</title>
	    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
	    </Head>
	    <Structure header1={headerArea} nav1={navigationArea} mainarea={this.props.children}/>
	    </div>
    }
}
Layout.propTypes = {
//    title: PropTypes.string.isRequired,
    

}
    
export default Layout

