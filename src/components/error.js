import React from 'react'
import { Link } from 'gatsby'
import { GoArrowLeft as Back } from "react-icons/go"
import styled, { css } from 'styled-components'

import { flex, media, rem } from '../styles'
import { useRandomChars } from '../utils/hooks'

const Wrapper = styled.div`
  ${flex};
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: calc(100vh - ${({ theme }) => theme.navHeight}px);

  ${media.xs(css`
    justify-content: space-around;
  `)}
`

const MessageWrapper = styled.div`
  width: 100%;

  h1, p {
    text-align: center;
  }

  h1 {
    border: 0;
    margin: 0;
    font-size: ${rem(50)};
    font-weight: 200;

    ${media.xs(css`
      margin-top: ${rem(20)};
    `)}
  }

  p {
    margin-bottom: ${rem(6)};
    font-size: ${rem(22)};
    font-weight: 400;
  }
`

const ImageWrapper = styled.div`
  width: 300px;
  height: 300px;

  margin: 20px 0;

  ${media.xs(css`
    width: auto;
    height: auto;
    max-height: 300px;
  `)}

  img {
    border-radius: 50%;

    ${media.xs(css`
      border-radius: 0;
    `)}
  }
`

const IconWrapper = styled.div`
  ${media.xs(css`
    width: 100%;

    a {
      ${flex}
      width: 100%;
      padding: ${rem(20)} 0;
    }
  `)}
`

const BackIcon = () => (
  <IconWrapper>
    <Link to="/">
      <Back style={{ fontSize: "40px", marginTop: "10px" }} />
    </Link>
  </IconWrapper>
)

const ErrorMessage = () => {
  const { data } = useRandomChars({ total: 1 })

  return (
    <Wrapper>
      <MessageWrapper>
        <h1>404</h1>
        <p>Oh Jeez! there is nothing here.</p>
        <p>But I could show you a cute picture of <strong>{data.name}</strong>.</p>
      </MessageWrapper>
      <ImageWrapper>
        {data.image && <img src={data.image} alt='🐈'/>}
      </ImageWrapper>
      <BackIcon />
    </Wrapper>
  )
}

export default ErrorMessage
