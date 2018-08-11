import React from 'react'

import config from "siteConfig"
import Home from 'components/Home'
import Layout from 'components/Layout'

const Index = ({ location }) => (
  <Layout location={location}>
    <Home title={config.siteTitle} description={config.siteDescription} />
  </Layout>
)

export default Index
