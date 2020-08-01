import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GlobalStyles } from '../../styles/global'
import SEO from './seo'
import Header from './header'
import Footer from './footer'

const Main = styled.main`
  padding-top: 2px;
`

const Layout = ({ children, seo }) => (
  <>
    <SEO {...seo} />
    <GlobalStyles />
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
)

Layout.propTypes = {
  seo: PropTypes.object,
}

export default Layout
