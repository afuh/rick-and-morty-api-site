import React from 'react'

import Home from '../components/home'
import Layout from '../components/layout'
import { useRickAndMortyStats } from '../utils/hooks'

const Index = () => {

  const stats = useRickAndMortyStats()

  return (
    <Layout>
      <Home
        stats={stats}
      />
    </Layout>
  )
}


export default Index
