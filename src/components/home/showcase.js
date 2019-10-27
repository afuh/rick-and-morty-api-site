import React from 'react'
import styled, { css } from 'styled-components'
import Spinner from 'react-spinkit'

import { useRandomChars } from '../../utils/hooks'
import { flex, rem, media } from '../../styles'
import Card from './characterCard'

const Wrapper = styled.section`
  ${flex}

  padding: ${rem(30)};
  background: ${({ theme }) => theme.backBlack};
  min-height: calc(60vh - ${({ theme }) => theme.navHeight}px);

  ${media.phone(css`
    padding: 0;
  `)}
`

const Inner = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1260px;
  min-height: 40vh;
`

const Loading = () => (
  <Spinner
    name='triangle-skew-spin'
    color='rgb(255, 152, 0)'
  />
)

const Showcase = () => {
  const { loading, data } = useRandomChars({ total: 8 })

  return (
    <Wrapper>
      <Inner>
        {
          loading ?
            <Loading /> :
            data.map(char => (
              <Card
                key={char.id}
                char={char}
              />
            ))
        }
      </Inner>
    </Wrapper>
  )
}

export default Showcase
