import React from 'react'
import { Link } from 'gatsby'
import { GoArrowLeft as Back } from 'react-icons/go'
import styled, { css } from 'styled-components'

import { useRandomChars } from '../utils/hooks'

const Wrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flex};
    flex-direction: column;
    flex-wrap: nowrap;
    min-height: calc(100vh - ${theme.navHeight}px);

    ${theme.media.phone(css`
      padding-top: ${theme.spacing._20};
    `)}
  `}
`

const MessageWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;

    h1, p {
      text-align: center;
    }

    h1 {
      border: 0;
      margin: 0;
      font-size: ${theme.spacing.rem(60)};
      font-weight: 200;
    }

    p {
      margin-bottom: ${theme.spacing._4};
      font-size: ${theme.spacing._24};
      font-weight: 400;
    }
  `}
`

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    width: 300px;
    height: 300px;
    margin: ${theme.spacing._24} 0;

    ${theme.media.phone(css`
      width: 100%;
      height: auto;
    `)}

    img {
      border-radius: 50%;

      ${theme.media.phone(css`
        border-radius: 0;
      `)}
    }
  `}
`

const IconWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.media.phone(css`
      width: 100%;

      a {
        ${theme.mixins.flex}
        width: 100%;
        padding: ${theme.spacing._20} 0;
      }
    `)}
  `}
`

const BackIcon = () => (
  <IconWrapper>
    <Link to='/'>
      <Back style={{ fontSize: '40px', marginTop: '10px' }} />
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
