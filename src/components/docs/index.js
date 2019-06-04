import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Sidebar from './sidebar'
import { prismCSS, media } from '../../styles'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${media.phone(css`
    display: block;
  `)}

  ${prismCSS}
`

const Docs = ({ html }) => (
  <Wrapper>
    <Sidebar />
    <article dangerouslySetInnerHTML={{ __html: html }} />
  </Wrapper>
)

Docs.propTypes = {
  html: PropTypes.string.isRequired
}

export default Docs
