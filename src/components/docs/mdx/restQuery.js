import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useSiteMeta } from '../../../utils/hooks'

const Wrapper = styled.div`
  .endpoint {
    color: var(--punctuation);
  }

  .request {
    font-weight: 500;
    color: var(--string);
    user-select: none;
  }
`

const RestQuery = ({ endpoint }) => {
  const { siteUrl } = useSiteMeta()
  const basePath = `${siteUrl}/api`

  return (
    <Wrapper className="gatsby-highlight" data-language="shell">
      <pre className="language-shell">
        <code className="language-shell">
          <span className="endpoint">
            <span className="request">GET </span>
            {basePath}
          </span>
          {endpoint}
        </code>
      </pre>
    </Wrapper>
  )
}

RestQuery.propTypes = {
  endpoint: PropTypes.string,
}

export default RestQuery
