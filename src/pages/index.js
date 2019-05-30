import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Home from '../components/home'
import Layout from '../components/layout'

const Index = ({
  data: {
    stats,
    site: {
      meta
    }
  },
  location
}) => (
  <Layout location={location}>
    <Home
      stats={stats}
      title={meta.title}
      description={meta.description}
    />
  </Layout>
)

Index.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Index

export const query = graphql`
  {
    stats: rickAndMortyAPI {
      ...statistics
    }
    site {
      meta: siteMetadata {
        title
        description
      }
    }
  }
`
