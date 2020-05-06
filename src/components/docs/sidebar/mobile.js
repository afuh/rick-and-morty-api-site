import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Button from './button'
import { useMobileSidebar } from '../../../utils/hooks'

const Wrapper = styled.div`
  ${({ theme, isOpen }) => css`
    height: 100vh;
    position: fixed;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.white};
    z-index: 999;
    pointer-events: none;

    transform: translateX(-100%);
    opacity: 0;

    ${isOpen &&
    css`
      transform: translateX(0);
      pointer-events: auto;
      opacity: 1;
    `}

    transition: all 0.3s ease;
  `}
`

const Nav = styled.nav`
  ${({ theme, isOpen }) => css`
    padding: ${theme.spacing._24};
    width: ${theme.sidebarWidth}px;
    transform: translateX(-100%);

    ${isOpen &&
    css`
      transform: translateX(0);
    `}

    transition: transform 0.5s ease;
  `};
`

const MobileWrapper = ({ render }) => {
  const navRef = useRef()
  const { isOpen, setIsOpen } = useMobileSidebar(navRef)

  return (
    <div id="nav-mobile">
      <Button isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <Wrapper isOpen={isOpen}>
        <Nav ref={navRef} isOpen={isOpen}>
          {render}
        </Nav>
      </Wrapper>
    </div>
  )
}

MobileWrapper.propTypes = {
  render: PropTypes.element.isRequired,
}

export default MobileWrapper
