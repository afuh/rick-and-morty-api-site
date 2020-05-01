import React from 'react'
import styled, { css } from 'styled-components'

import Sidebar from './sidebar'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${({ theme }) => theme.media.phone(css`
    display: block;
  `)}
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
