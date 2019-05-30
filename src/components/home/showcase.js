import React from 'react'
import styled, { css } from 'styled-components'

import { flex, rem, media, navHeight } from '../../styles/utils'

const Wrapper = styled.section`
  ${flex}

  padding: ${rem(30)};
  background: ${({ theme }) => theme.backBlack};
  min-height: calc(60vh - ${navHeight});

  ${media.xs(css`
    padding: ${rem(30)} 0;
  `)}
`

const Inner = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1260px;
  min-height: 40vh;
`

const Showcase = ({ children }) => (
  <Wrapper>
    <Inner>
      {children}
    </Inner>
  </Wrapper>
)

export default Showcase
