import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle, ThemeProvider } from "styled-components"

import SEO from '../utils/seo'
import Header from './Header'
import Footer from './Footer'

import globalCSS, { theme } from '../styles/global'

const GlobalStyles = createGlobalStyle`
  ${globalCSS}
`

const Layout = ({ children, location }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <SEO />
      <Header location={location} />
      <main>
        {children}
      </main>
      <Footer />
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  location: PropTypes.object.isRequired
}

export default Layout
