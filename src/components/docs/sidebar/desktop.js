import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => css`
    position: sticky;
    position: -webkit-sticky;
    top: ${theme.navHeight}px;
    padding: ${theme.spacing._24};
    border-right: 1px solid ${theme.lightgray};
    min-width: ${theme.sidebarWidth}px;
    height: calc(100vh - ${theme.navHeight}px);
    overflow-y: auto;
  `}
`

const DesktopWrapper = ({ render }) => {
  return (
    <Wrapper id="nav-desktop">
      <nav>{render}</nav>
    </Wrapper>
  )
}

DesktopWrapper.propTypes = {
  render: PropTypes.element.isRequired,
}

export default DesktopWrapper
