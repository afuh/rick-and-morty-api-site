import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useLocation } from '@reach/router'
import styled, { css } from 'styled-components'
import { GoHeart } from 'react-icons/go'

import HomeIcon from '../../assets/svg/icon.svg'
import { useSiteMeta } from '../../utils/hooks'
import { Caption as _Caption } from '../shared'

const Header = styled.header`
  ${({ theme, isFixed }) => css`
    ${theme.mixins.flex}
    height: ${theme.navHeight}px;
    background: ${theme.white}ff;
    border-bottom: 1px solid ${isFixed ? theme.lightgray : 'transparent'};
    position: ${isFixed ? 'fixed' : 'relative'};
    width: ${isFixed && '100%'};
    z-index: 2;

    ${theme.media.phone(css`
      border-bottom: none;
    `)}

    .nav-item {
      transition: all 0.1s;

      &__primary {
        font-weight: 700;
      }
    }

    .home-icon {
      ${theme.mixins.flex}

      svg {
        fill: ${theme.black};
      }
    }
  `}
`

const Nav = styled.nav`
  ${({ theme }) => css`
    ${theme.mixins.flex({ x: 'space-between', y: 'center' })}
    margin: 0 auto;
    width: 100%;
    min-height: ${theme.navHeight}px;
    padding: 0 ${theme.spacing._24};

    ${theme.media.phone(css`
      border-bottom: 1px solid ${theme.lightgray};
    `)}
  `}
`

const Link = styled(GatsbyLink).attrs({
  className: 'nav-item',
})`
  ${({ theme }) => css`
    color: ${theme.black};
    border: none;

    ${theme.mixins.hover(css`
      color: ${theme.primary};
    `)}

    &.active {
      color: ${theme.primary};
    }
  `}
`

const List = styled.ul`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    padding: 0;
    margin: 0;

    li {
      margin: 0;
    }

    li:not(:last-child) {
      margin-right: ${theme.spacing._28};
    }
  `}
`

const buttonHover = ({ theme }) => css`
  border: 1px solid transparent;
  background: ${theme.primary};
  color: ${theme.white};
`

const Caption = styled(_Caption).attrs({
  className: 'nav-item',
})`
  ${({ theme }) => css`
    margin: 0;
    background: ${theme.primary};
    border-radius: ${theme.spacing._8};
    padding: ${theme.spacing._8} ${theme.spacing._16};
    color: ${theme.white};
    font-weight: 500;

    border: 1px solid ${theme.primary};
    background: ${theme.white};
    color: ${theme.black};

    ${theme.mixins.hover(css`
      ${buttonHover}
    `)};

    &.mobile {
      display: none;
      padding: ${theme.spacing._4} ${theme.spacing._8};
      ${buttonHover}
    }

    ${theme.media.phone(css`
      &.desktop {
        display: none;
      }

      &.mobile {
        display: block;
      }
    `)}
  `};
`

const PrimaryNav = () => {
  const { nav } = useSiteMeta()
  const supportText = 'help us'

  return (
    <List>
      {nav.map(({ path, title }) => (
        <li key={path}>
          <Link
            to={path}
            name={path}
            activeClassName="active"
            partiallyActive={path.length > 1}
            className="nav-item__primary"
          >
            {title}
          </Link>
        </li>
      ))}
      <li>
        <Link to="/help-us">
          <Caption className="desktop">{supportText}</Caption>
          <Caption className="mobile" title={supportText} aria-label={supportText}>
            <GoHeart style={{ fontSize: 16, verticalAlign: 'middle' }} />
          </Caption>
        </Link>
      </li>
    </List>
  )
}

const MainHeader = () => {
  const { pathname } = useLocation()

  return (
    <Header isFixed={pathname.includes('documentation')}>
      <Nav>
        <Link to="/" aria-label="home page" className="home-icon">
          <HomeIcon />
        </Link>
        <PrimaryNav />
      </Nav>
    </Header>
  )
}

export default MainHeader
