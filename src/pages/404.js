import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import ErrorMessage from '../components/Error'
import Layout from '../components/Layout'

const NotFoundPage = ({ location, data: { site: { meta } } }) => (
  <Layout location={location}>
    <Helmet title={`Oh Jeez! | ${meta.title}`} />
    <ErrorMessage />
  </Layout>
)

NotFoundPage.propTypes = {
  data: PropTypes.object.isRequired
}


export default NotFoundPage

export const query = graphql`
  {
    site {
      meta: siteMetadata {
        title
      }
    }
  }
`
