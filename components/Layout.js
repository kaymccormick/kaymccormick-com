/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Structure from './Structure'
import Header from './Header'
import './Layout.scss'

const sectionBackgroundColor = '#f4cd14'
//ab8f0e
const Section = (props) => <div className="nav1__section"><Link href={props.href}><a>{props.title}</a></Link></div>;

const Navigation = (props) => <nav className="nav1">{props.children}</nav> 

const siteSections = { 'Software': { href: '/software' },
		       'Personal': { href: '/personal' },
		       'Seattle': { href: '/seattle' },}


const headerArea = <header><div className="font2" css={{ paddingLeft: '5em', fontSize: '48pt' }}>Kay McCormick</div></header>
const navigationArea = <Navigation>{Object.keys(siteSections).map(section => <Section key={section} title={section} {...siteSections[section]}/>)}</Navigation>

export default (props) => <div>
    <Head>
    <link rel="stylesheet" href="https://use.typekit.net/djs7szq.css"/>
    <title>{props.title}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Structure area1={headerArea} area2={navigationArea} area3={props.chidren}/>
</div>
