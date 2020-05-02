import React from 'react'
import styled, { css } from 'styled-components'

import Sidebar from './sidebar'

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

const Docs = ({ children }) => (
  <Wrapper>
    <Sidebar />
    <div>
      {children}
    </div>
  </Wrapper>
)

export default Docs
