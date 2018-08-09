import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { injectGlobal } from "styled-components"

import SEO from 'components/SEO'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

import config from "siteConfig"

import globalCSS from 'styles/global'

injectGlobal`
  ${globalCSS}
`

const Template = ({ children, location }) => (
  <>
    <Helmet title={config.siteTitle} />
    <SEO />
    <Header location={location} />
    <main>
      {children}
    </main>
    <Footer />
  </>
)

Template.propTypes = {
  location: PropTypes.object.isRequired
}

export default Template
