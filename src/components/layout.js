import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle, ThemeProvider } from "styled-components"

import SEO from 'components/SEO'
import Header from 'components/Header'
import Footer from 'components/Footer'

import globalCSS, { theme } from 'styles/global'

const GlobalStyles = createGlobalStyle`
  ${globalCSS}
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={query}
    render={({ site: { meta } }) => (
      <ThemeProvider theme={theme}>
        <>
        <GlobalStyles />
        <Helmet title={meta.titler} />
        <SEO />
        <Header location={location} />
        <main>
          {children}
        </main>
        <Footer />
      </>
      </ThemeProvider>
    )}
  />
)

Layout.propTypes = {
  location: PropTypes.object.isRequired
}

export default Layout

const query = graphql`
  {
    site {
      meta: siteMetadata {
        title
      }
    }
  }
`
