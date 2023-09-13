import React from 'react'
import { GraphiQL } from 'graphiql'
import { Link } from 'gatsby'

import 'graphiql/graphiql.min.css'
import styled from 'styled-components'

const fetcher = async (graphQLParams) => {
  const data = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    body: JSON.stringify(graphQLParams),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return data.json().catch(() => data.text())
}

GraphiQL.Logo = () => (
  <div className="graphiql-logo">
    <Link className="graphiql-logo-link" to="/">
      Rick And Morty API
    </Link>
  </div>
)

const Wrapper = styled.div`
  height: 600px;
  margin-bottom: 20px;

  .graphiql-container {
    border-radius: var(--radius);
  }
`

const GraphiQLWrapper = () => {
  if (typeof window === 'undefined') return null

  return (
    <Wrapper>
      <GraphiQL
        maxHistoryLength={5}
        isHeadersEditorEnabled={false}
        showPersistHeadersSettings={false}
        fetcher={fetcher}
        query={`{
  characters(filter: {name: "rick"}) {
    info {
      pages
      count
    }
    results {
      name
    }
  }
}
`}
      />
    </Wrapper>
  )
}

export default GraphiQLWrapper
