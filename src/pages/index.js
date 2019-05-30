import React from 'react'

import Home from '../components/home'
import Layout from '../components/layout'
import { useSiteMeta, useRickAndMortyStats } from '../utils/hooks'

const Index = () => {
  const { title, description } = useSiteMeta()
  const stats = useRickAndMortyStats()

  return (
    <Layout>
      <Home
        stats={stats}
        title={title}
        description={description}
      />
    </Layout>
  )
}


export default Index
