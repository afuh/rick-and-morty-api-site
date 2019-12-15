import React from 'react'
import styled, { css } from 'styled-components'

import Sidebar from './sidebar'
import { media } from '../../styles'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${media.phone(css`
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
