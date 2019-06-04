import React from 'react'
import styled, { css } from 'styled-components'

import { useSiteMeta } from '../../utils/hooks'
import { flex, rem, media } from '../../styles'

const headingsStyles = css`
  margin: 0;
  text-transform: uppercase;
  color: ${({ theme }) => theme.backBlack};
  border: none;

  ${media.phone(css`
    line-height: 1;
    padding: 0 18px;
    margin: 0;
  `)}
`

const Wrapper = styled.section`
  ${flex}
  flex-direction: column;
  height: 40vh;
  text-align: center;

  ${media.phone(css`
    display: block;
    height: auto;
    margin: ${rem(40)} 0;
  `)}
`

const SubTitleWrapper = styled.div`
  padding: 5px 4px 0;
  background: ${({ theme }) => theme.backBlack};
  transform: skew(-2deg) translateY(-6px) translateY(-12px);

  ${media.phone(css`
    transform: none;
    background: #fff;
  `)}
`

const Title = styled.h1`
  ${headingsStyles}
  font-size: ${rem(60)};

  ${media.phone(css`
    font-size: ${rem(40)};
  `)}
`

const SubTitle = styled.h2`
  ${headingsStyles}
  font-size: ${rem(30)};
  color: ${({ theme }) => theme.orange};
  transform: skew(2deg);

  ${media.phone(css`
    transform: none;
    font-size: ${rem(20)};
  `)}
`

const HiddenSubTitle = styled(SubTitle)`
  position: absolute;
  padding: 0 ${rem(4)};
  width: 100%;
  top: 4px;
  left: 0;
  color: transparent;

  &::selection {
    background: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.backBlack};
  }
`

const Hero = () => {
  const { title, description, subDescription } = useSiteMeta()

  return (
    <Wrapper>
      <Title>{title}</Title>
      <SubTitleWrapper>
        <SubTitle>{description}</SubTitle>
        <HiddenSubTitle>
          &nbsp; &nbsp; &nbsp;{subDescription}&nbsp; &nbsp; &nbsp;
        </HiddenSubTitle>
      </SubTitleWrapper>
    </Wrapper>
  )
}

export default Hero
