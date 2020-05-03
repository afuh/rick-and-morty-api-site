import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useLocation } from '@reach/router'
import styled, { css } from 'styled-components'
import { GoHeart } from 'react-icons/go'

import { useSiteMeta } from '../../utils/hooks'
import { Caption as _Caption } from '../shared'

const Header = styled.header`
  ${({ theme, isFixed }) => css`
    ${theme.mixins.flex}
    height: ${theme.navHeight}px;
    background: ${theme.white};
    border-bottom: 1px solid ${isFixed ? theme.lightgray : 'transparent'};
    position: ${isFixed && 'fixed'};
    z-index: ${isFixed && 2};
    width: ${isFixed && '100%'};

    ${theme.media.phone(css`
      border-bottom: none;
    `)}

    .nav-item {
      transition: all 0.1s;
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
      color: ${theme.gray};
    `)}

    &.active {
      color: ${theme.gray};
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

      & + li {
        margin-left: ${theme.spacing._24};
      }
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

  return (
    <List>
      {nav.map(({ path, title }) => (
        <li key={path}>
          <Link to={path} name={path} activeClassName="active" partiallyActive={path.length > 1}>
            {title}
          </Link>
        </li>
      ))}
    </List>
  )
}

const MainHeader = () => {
  const { pathname } = useLocation()
  const supportText = 'help us'
  return (
    <Header isFixed={pathname.includes('documentation')}>
      <Nav>
        <PrimaryNav />
        <Link to="/help-us">
          <Caption className="desktop">{supportText}</Caption>
          <Caption className="mobile" title={supportText} aria-label={supportText}>
            <GoHeart style={{ fontSize: 16, verticalAlign: 'middle' }} />
          </Caption>
        </Link>
      </Nav>
    </Header>
  )
}

export default MainHeader
