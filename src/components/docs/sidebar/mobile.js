import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Button from './button'
import { media } from '../../../styles'
import { useMobileSidebar } from '../../../utils/hooks'

const Wrapper = styled.div`
  height: 100vh;
  position: fixed;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 999;
  pointer-events: none;
  border-right: 1px solid rgba(46, 41, 51, 0.08);
  box-shadow: rgba(46, 41, 51, 0.08) 11px 0px 10px 0px;

  transform: translateX(-100%);
  opacity: 0;

  ${({ isOpen }) => isOpen && css`
    transform: translateX(0);
    pointer-events: auto;
    opacity: 1;
  `}

  transition: all 0.3s ease;

  ${media.phone(css`
    right: 0;
    border: none;
    box-shadow: none;
  `)}
`

const Nav = styled.nav`
  padding: 30px 30px 40px;
  transform: translateX(-100%);

  ${({ isOpen }) => isOpen && css`
    transform: translateX(0);
  `}

  transition: transform 0.5s ease;
`

const MobileWrapper = ({ render }) => {
  const navRef = useRef()
  const { isOpen, setIsOpen } = useMobileSidebar(navRef)

  return (
    <div id='nav-mobile'>
      <Button
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Wrapper isOpen={isOpen}>
        <Nav
          ref={navRef}
          isOpen={isOpen}
        >
          {render}
        </Nav>
      </Wrapper>
    </div>
  )
}

MobileWrapper.propTypes = {
  render: PropTypes.element.isRequired
}

export default MobileWrapper
