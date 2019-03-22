import React from 'react'

import Header from '../components/Header'
import Layout from '../components/Layout'

const Card = (props) => <div className="card"><div className="card__title">{props.title}</div><div className="card__body">{props.children}</div></div>
      
export default (props) => <Layout pageTitle="Kay McCormick - Development"
    title="Software Development">
    <Card title="Projects"></Card>
    </Layout>
    
        
    
