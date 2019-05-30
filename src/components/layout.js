import React from 'react'
import { createGlobalStyle, ThemeProvider } from "styled-components"

import SEO from '../utils/seo'
import Header from './header'
import Footer from './footer'
import globalCSS, { theme } from '../styles/global'

const GlobalStyles = createGlobalStyle`
  ${globalCSS}
`

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <SEO />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  </ThemeProvider>
)

export default Layout
