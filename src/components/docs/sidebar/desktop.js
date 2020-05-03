import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { useStickySidebar } from '../../../utils/hooks'

const Wrapper = styled.div`
  ${({ theme, bottom }) => css`
    padding: ${theme.spacing._24};
    margin-right: ${theme.spacing._24};
    border-right: 1px solid ${theme.lightgray};
    background: ${theme.white};

    position: fixed;
    top: ${theme.navHeight}px;
    left: 0;
    bottom: ${bottom}px;
    overflow-y: scroll;
    min-width: ${theme.sidebarWidth}px;
  `}
`


const DesktopWrapper = ({ render }) => {
  const bottom = useStickySidebar()

  return (
    <Wrapper id='nav-desktop' bottom={bottom}>
      <nav>{render}</nav>
    </Wrapper>
  )
}

DesktopWrapper.propTypes = {
  render: PropTypes.element.isRequired
}

export default DesktopWrapper
