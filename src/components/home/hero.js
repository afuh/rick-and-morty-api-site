import React from 'react'
import styled, { css } from 'styled-components'

import { useSiteMeta } from '../../utils/hooks'
import BackroundSVG from '../../assets/svg/rm-hero.svg'

const Wrapper = styled.section`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    flex-direction: column;
    height: calc(50vh - ${theme.navHeight}px);
    text-align: center;
    position: relative;

    .hero-image {
      position: absolute;
      width: 100%;
      height: 100%;

      svg {
        width: 100%;
        height: 100%;
        fill: red;
      }
    }

    ${theme.media.phone(css`
      padding: 0 ${theme.spacing._20};
    `)}
  `}
`

const Title = styled.h1`
  ${({ theme }) => css`
    margin: 0;
    color: ${theme.backBlack};
    border: none;
    font-weight: 900;
    z-index: 1;
    font-size: ${theme.spacing.rem(80)};

    ${theme.media.mobile(css`
      font-size: ${theme.spacing.rem(60)};
    `)}

    ${theme.media.phone(css`
      font-size: ${theme.spacing.rem(50)};
    `)}
  `}
`

const Hero = () => {
  const { title } = useSiteMeta()

  return (
    <Wrapper>
      <Title>{title}</Title>
      <div className='hero-image'>
        <BackroundSVG />
      </div>
    </Wrapper>
  )
}

export default Hero
