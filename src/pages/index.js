import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Home from 'components/Home'
import Layout from 'components/Layout'

const Index = ({ location, data: { site: { meta } } }) => (
  <Layout location={location}>
    <Home
      title={meta.title}
      description={meta.description}
    />
  </Layout>
)

Index.propTypes = {
  data: PropTypes.object.isRequired
}

export default Index

export const query = graphql`
  {
    site {
      meta: siteMetadata {
        title
        description
      }
    }
  }
`
