import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { useStickySidebar } from '../../../utils/hooks'

const Wrapper = styled.div`
  position: relative;
  min-width: 210px;
  height: 100%;
  border-right: 1px solid rgba(46, 41, 51, 0.08);
  margin-right: ${({ theme }) => theme.spacing._24};
`

const Nav = styled.nav`
  overflow-y: scroll;
  position: relative;
  margin-top: ${({ margin }) => margin}px;

  ${({ fixed, hide }) => fixed && css`
    position: fixed;
    top: 0;
    max-height: ${hide !== 0 ? `calc(100vh - ${hide}px)` : '100vh'};
  `}
`

const DesktopWrapper = ({ render }) => {
  const { fixed, bottom, marginTop } = useStickySidebar()

  return (
    <Wrapper id='nav-desktop'>
      <Nav
        margin={marginTop}
        fixed={fixed}
        hide={bottom}
      >
        {render}
      </Nav>
    </Wrapper>
  )
}

DesktopWrapper.propTypes = {
  render: PropTypes.element.isRequired
}

export default DesktopWrapper
