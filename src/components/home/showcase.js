import React from 'react'
import styled, { css } from 'styled-components'

import { useRandomCharacters } from '../../utils/hooks'
import { Spinner } from '../shared'
import Card from './characterCard'

const Wrapper = styled.section(
  ({ theme }) => css`
    ${theme.mixins.flex}
    padding: ${theme.spacing.rem(72)} 0;
    background: ${theme.backBlack};
    min-height: calc(50vh - ${theme.navHeight}px);

    ${theme.media.phone(css`
      padding: ${theme.spacing._24};
    `)}
  `,
)

const Inner = styled.div(
  ({ theme }) => css`
    ${theme.mixins.flex};
    flex-wrap: wrap;
    max-width: 1920px;
  `,
)

const Showcase = () => {
  const { loading, data } = useRandomCharacters({ total: 6 })

  return (
    <Wrapper>
      <Inner>{loading ? <Spinner /> : data.map((char) => <Card key={char.id} {...char} />)}</Inner>
    </Wrapper>
  )
}

export default Showcase
