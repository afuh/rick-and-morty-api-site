import React from 'react'
import Helmet from 'react-helmet'

import config from '../../config/SiteConfig'
import Error from '../components/Error/Error'
import Layout from '../components/Layout'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <div>
      <Helmet title={`Oh Jeez! | ${config.siteTitle}`} />
      <Error message='Oh Jeez! there is nothing here.'/>
    </div>
  </Layout>
)

export default NotFoundPage
