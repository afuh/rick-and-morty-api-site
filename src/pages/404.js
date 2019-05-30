import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import ErrorMessage from '../components/error'
import Layout from '../components/layout'

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
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
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
