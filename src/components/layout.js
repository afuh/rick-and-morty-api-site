import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { createGlobalStyle, ThemeProvider } from "styled-components"

import SEO from 'components/SEO'
import Header from 'components/Header'
import Footer from 'components/Footer'

import config from "siteConfig"

import globalCSS, { theme } from 'styles/global'

const GlobalStyles = createGlobalStyle`
  ${globalCSS}
`

const Template = ({ children, location }) => (
  <ThemeProvider theme={theme}>
  <>
    <GlobalStyles />
    <Helmet title={config.siteTitle} />
    <SEO />
    <Header location={location} />
    <main>
      {children}
    </main>
    <Footer />
  </>
  </ThemeProvider>
)

Template.propTypes = {
  location: PropTypes.object.isRequired
}

export default Template
