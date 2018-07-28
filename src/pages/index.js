import React from 'react'

import config from '../../config/SiteConfig';
import Home from '../components/Home/Home';
import Layout from '../components/Layout';

export default ({location}) => (
  <Layout location={location}>
    <Home title={config.siteTitle} description={config.siteDescription} />
  </Layout>
)
