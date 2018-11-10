import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import ErrorMessage from '../components/Error'
import Layout from '../components/Layout'

const NotFoundPage = ({
  data: {
    stats,
    site: {
      meta
    }
  },
  location
}) => (
  <Layout location={location}>
    <Helmet title={`Oh Jeez! | ${meta.title}`} />
    <ErrorMessage stats={stats}/>
  </Layout>
)

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default NotFoundPage

export const query = graphql`
  {
    stats: rickAndMortyAPI {
      ...statistics
    }
    site {
      meta: siteMetadata {
        title
      }
    }
  }
`
