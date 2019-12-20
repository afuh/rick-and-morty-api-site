import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

import SEO from '../../utils/seo'
import Header from './header'
import Footer from './footer'
import { GlobalStyles, theme } from '../../styles'

const Main = styled.main`
  padding-top: 2px;
`

const Layout = ({ children, seo }) => (
  <>
    <SEO {...seo} />
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <Main>
          {children}
        </Main>
        <Footer />
      </>
    </ThemeProvider>
  </>
)

Layout.propTypes = {
  seo: PropTypes.object
}

export default Layout
