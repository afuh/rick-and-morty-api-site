import React from 'react'
import styled, { css } from 'styled-components'

import { Article as _Article } from '../shared'
import Sidebar from './sidebar'

const Wrapper = styled.div(
  ({ theme }) => css`
    margin-top: ${theme.navHeight - 2}px;
    display: flex;

    ${theme.media.mobile(css`
      display: block;
    `)}

    .content {
      overflow: hidden;
      flex-grow: 1;
    }
  `,
)

// Compensate the fixed header
const Article = styled(_Article)(
  ({ theme }) => css`
    h2 {
      padding-top: ${theme.navHeight + 24}px;
      margin-top: -${theme.navHeight - 32}px;
      position: inherit !important;
    }

    h3 {
      padding-top: ${theme.navHeight + 24}px;
      margin-top: -${theme.navHeight}px;
      position: inherit !important;
    }
  `,
)

const Docs = ({ children }) => (
  <Wrapper>
    <Sidebar />
    <div className="content">
      <Article>{children}</Article>
    </div>
  </Wrapper>
)

export default Docs
