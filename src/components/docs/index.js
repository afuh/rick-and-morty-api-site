import React from 'react'
import styled, { css } from 'styled-components'

import Sidebar from './sidebar'
import { Article as _Article } from '../shared'

const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.navHeight}px;

    ${theme.media.phone(css`
      display: block;
    `)}

    .content {
      padding-left: ${theme.sidebarWidth}px;

      ${theme.media.mobile(css`
        padding-left: initial;
      `)}
    }
  `}
`

// Compensate the fixed header
const Article = styled(_Article)`
  ${({ theme }) => css`
    h2 {
      padding-top: ${theme.navHeight + 24}px;
      margin-top: -${theme.navHeight - 32}px;
    }

    h3 {
      padding-top: ${theme.navHeight + 24}px;
      margin-top: -${theme.navHeight}px;
    }
  `}
`

const Docs = ({ children }) => (
  <Wrapper>
    <Sidebar />
    <div className='content'>
      <Article>{children}</Article>
    </div>
  </Wrapper>
)

export default Docs
