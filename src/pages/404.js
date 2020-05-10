import React from 'react'
import { Helmet } from 'react-helmet'
import styled, { css } from 'styled-components'

import Layout from '../components/layout'

const H1 = styled.h1`
  ${({ theme }) => css`
    ${theme.mixins.flex};
    background: ${theme.backBlack};
    min-height: calc(100vh - ${theme.navHeight}px});
    color: ${theme.white};
    font-size: 600px;
    font-weight: 900;
    line-height: 1;
    margin: 0;
    padding: 0;

    ${theme.media.mobile(css`
      font-size: 96px;
    `)}
  `}
`

const NotFoundPage = () => {
  return (
    <Layout>
      <Helmet title="Oh Jeez!" />
      <H1>404</H1>
    </Layout>
  )
}

export default NotFoundPage
