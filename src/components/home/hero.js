import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { flex, rem, media } from '../../styles/utils'

const headers = css`
  margin: 0;
  text-transform: uppercase;
  line-height: 0.75em;
  color: ${({ theme }) => theme.backBlack};
  border: none;

  ${media.sm(css`
    line-height: 1;
    padding: 0 ${rem(12)};
  `)}

  ${media.xs(css`
    margin: ${rem(10)} 0;
  `)}
`

const Wrapper = styled.section`
  ${flex}
  flex-direction: column;
  height: 40vh;
  text-align: center;

  ${media.xs(css`
    flex-wrap: wrap;
    height: auto;
    margin-top: ${rem(40)};
  `)}
`

const SubTitleWrapper = styled.div`
  padding: ${rem(5)} ${rem(4)} 0;
  background: ${({ theme }) => theme.backBlack};
  transform: skew(-2deg) translateY(-6px);

  ${media.sm(css`
    background: #fff;
  `)}
`

const Title = styled.h1`
  ${headers}

  font-size: ${rem(60)};

  ${media.xs(css`
    font-size: ${rem(40)};
  `)}
`

const SubTitle = styled.h2`
  ${headers}

  font-size: ${rem(30)};
  color: ${({ theme }) => theme.orange};
  transform: skew(2deg);

  ${media.xs(css`
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

const Hero = ({ title, description }) => (
  <Wrapper>
    <Title>{title}</Title>
    <SubTitleWrapper>
      <SubTitle>{description}</SubTitle>
      <HiddenSubTitle>
        &nbsp; &nbsp; &nbsp; I got one right here, grab my terry flap&nbsp; &nbsp; &nbsp;
      </HiddenSubTitle>
    </SubTitleWrapper>
  </Wrapper>
)

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Hero
