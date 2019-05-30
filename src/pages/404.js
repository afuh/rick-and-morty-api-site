import React from 'react'
import Helmet from 'react-helmet'

import ErrorMessage from '../components/error'
import Layout from '../components/layout'
import { useSiteMeta, useRickAndMortyStats } from '../utils/hooks'

const NotFoundPage = () => {
  const { title } = useSiteMeta()
  const stats = useRickAndMortyStats()

  return (
    <Layout>
      <Helmet title={`Oh Jeez! | ${title}`} />
      <ErrorMessage stats={stats}/>
    </Layout>
  )
}

export default NotFoundPage
