import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { GoMarkGithub as GithubIcon } from 'react-icons/go'
import styled, { css } from 'styled-components'

import { useSiteMeta } from '../../utils/hooks'
import { ExternalLink } from '../shared'

const Link = styled(GatsbyLink)`
  ${({ theme }) => css`
    color: ${theme.black};
    transition: all .2s;
    border: none;

    &.active {
      color: ${theme.primary};
    }
  `}
`

const List = styled.ul`
  ${({ theme }) => css`
    display: flex;
    padding: 0;
    margin: 0;

    ${theme.media.phone(css`
      flex: 3;
      align-self: stretch;
      ${theme.mixins.flex({ x: 'space-around' })}

      li {
        align-self: stretch;
        margin: 0;
        ${theme.mixins.flex}

        a {
          align-self: stretch;
          width: 100%;
          ${theme.mixins.flex}
        }
      }
    `)}
  `}
`

const Nav = styled.nav`
  ${({ theme }) => css`
    ${theme.mixins.flex({ x: 'space-between', y: 'center' })}

    margin: 0 auto;
    max-width: 1200px;
    min-height: ${theme.navHeight}px;
    padding: 0 ${theme.spacing._20};

    ${theme.media.phone(css`
      padding: 0;
      border-bottom: 1px solid ${theme.lightgray};
    `)}
  `}
`

const GHLink = styled(ExternalLink)`
  ${({ theme }) => css`
    ${theme.mixins.hover(css`
      color: ${theme.primary};
    `)}

    ${theme.media.phone(css`
      flex: 1;
      align-self: stretch;
      ${theme.mixins.flex};
      border-left: 1px solid ${theme.lightgray};
    `)}

    ${theme.media.custom(340, css`
      display: none;
    `)}
  `}
`

const ListLink = ({ to, children, name }) => (
  <li style={{ margin: ' 0 1rem 0' }}>
    <Link
      to={to}
      name={name}
      activeClassName='active'
      partiallyActive={to.length > 1}
    >
      {children}
    </Link>
  </li>
)

ListLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

const Navigation = () => {
  const { nav } = useSiteMeta()

  return (
    <List>
      {nav.map(i => (
        <ListLink
          key={i.title}
          name={i.title}
          to={i.path}
        >
          {i.title}
        </ListLink>
      ))}
    </List>
  )
}

const Github = () => {
  const { github } = useSiteMeta()

  return (
    <GHLink
      href={github.api}
      title='GitHub'
    >
      <GithubIcon style={{ fontSize: 18 }}/>
    </GHLink>
  )
}

const Header = () => (
  <header css={`height: ${({ theme }) => theme.navHeight}px`}>
    <Nav>
      <Navigation />
      <Github />
    </Nav>
  </header>
)

export default Header
