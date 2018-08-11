import React from 'react'
import Helmet from 'react-helmet'

import config from "siteConfig"
import ErrorMessage from '../components/Error'
import Layout from '../components/Layout'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <Helmet title={`Oh Jeez! | ${config.siteTitle}`} />
    <ErrorMessage />
  </Layout>
)

export default NotFoundPage
