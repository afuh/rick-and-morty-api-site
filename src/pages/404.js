import React from 'react'
import Helmet from 'react-helmet'

import ErrorMessage from '../components/error'
import Layout from '../components/layout'
import { useSiteMeta } from '../utils/hooks'

const NotFoundPage = () => {
  const { title } = useSiteMeta()

  return (
    <Layout>
      <Helmet title={`Oh Jeez! | ${title}`} />
      <ErrorMessage />
    </Layout>
  )
}

export default NotFoundPage
