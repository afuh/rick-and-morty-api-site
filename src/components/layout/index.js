import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from "styled-components"

import SEO from '../../utils/seo'
import Header from './header'
import Footer from './footer'
import { GlobalStyles, theme } from '../../styles'

const Layout = ({ children, seo }) => (
  <>
    <SEO {...seo} />
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </>
    </ThemeProvider>
  </>
)

Layout.propTypes = {
  seo: PropTypes.object
}

export default Layout
