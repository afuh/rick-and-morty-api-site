import React from 'react'
import styled, { css } from 'styled-components'

import { useSiteMeta } from '../../utils/hooks'
import { flex, rem, media } from '../../styles'

import BackroundSVG from '../../assets/svg/rm-hero.svg'

const Wrapper = styled.section`
  ${flex}
  flex-direction: column;
  height: calc(50vh - ${({ theme }) => theme.navHeight}px);
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
`

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.backBlack};
  border: none;
  font-weight: 900;
  z-index: 1;
  font-size: ${rem(80)};

  ${media.mobile(css`
    font-size: ${rem(60)};
  `)}
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
