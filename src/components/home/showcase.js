import React from 'react'
import styled, { css } from 'styled-components'

import { useRandomChars } from '../../utils/hooks'
import Card from './characterCard'
import { Spinner } from '../shared'

const Wrapper = styled.section`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    padding: ${theme.spacing._32};
    background: ${theme.lightgray};
    min-height: calc(50vh - ${theme.navHeight}px);

    ${theme.media.phone(css`
      padding: 0;
    `)}
  `}
`

const Inner = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  max-width: 1260px;
`

const Showcase = () => {
  const { loading, data } = useRandomChars({ total: 8 })

  return (
    <Wrapper>
      <Inner>{loading ? <Spinner /> : data.map((char) => <Card key={char.id} char={char} />)}</Inner>
    </Wrapper>
  )
}

export default Showcase
