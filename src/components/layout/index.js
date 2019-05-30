import React from 'react'
import PropTypes from 'prop-types'
import { createGlobalStyle, ThemeProvider } from "styled-components"

import SEO from '../../utils/seo'
import Header from './header'
import Footer from './footer'
import globalCSS, { theme } from '../../styles/global'

const GlobalStyles = createGlobalStyle`
  ${globalCSS}
`

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
