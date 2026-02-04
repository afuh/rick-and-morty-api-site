import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router'
import styled, { css } from 'styled-components'
import { FaHeart } from 'react-icons/fa'

import HomeIcon from '../../assets/svg/icon.svg'
import { Button as _Button } from '../shared'

const navigation = [
  { title: 'Docs', path: '/documentation' },
  { title: 'About', path: '/about' },
]

const Header = styled.header(
  ({ theme, isFixed }) => css`
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
  `,
)

const Nav = styled.nav(
  ({ theme }) => css`
    ${theme.mixins.flex({ x: 'space-between', y: 'center' })}
    margin: 0 auto;
    width: 100%;
    min-height: ${theme.navHeight}px;
    padding: 0 ${theme.spacing._24};

    ${theme.media.phone(css`
      border-bottom: 1px solid ${theme.lightgray};
    `)}
  `,
)

const Link = styled(GatsbyLink)(
  ({ theme }) => css`
    color: ${theme.black};
    border: none;

    ${theme.mixins.hover(css`
      color: ${theme.primary};
    `)}

    &.active {
      color: ${theme.primary};
    }
  `,
)

const List = styled.ul(
  ({ theme }) => css`
    ${theme.mixins.flex}
    padding: 0;
    margin: 0;

    li {
      margin: 0;
    }

    li:not(:last-child) {
      margin-right: ${theme.spacing._28};
    }
  `,
)

const Button = styled(_Button)(
  ({ theme }) => css`
    &.mobile {
      display: none;
      padding: ${theme.spacing._4} ${theme.spacing._8};
    }

    ${theme.media.phone(css`
      &.desktop {
        display: none;
      }

      &.mobile {
        display: block;
      }
    `)}
  `,
)

const PrimaryNav = () => {
  const supportText = 'support us'

  return (
    <List>
      {navigation.map(({ path, title }) => (
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
        <Link to="/support-us" className="nav-item">
          <Button ghost className="desktop nav-item">
            {supportText}
          </Button>
          <Button className="mobile nav-item" title={supportText} aria-label={supportText}>
            <FaHeart style={{ fontSize: 16, verticalAlign: 'middle' }} />
          </Button>
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
