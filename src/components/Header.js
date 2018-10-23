import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { GoMarkGithub as GithubIcon } from "react-icons/go"
import styled, { css } from 'styled-components'

import { navHeight, flex, media, theme, hover } from 'styles/utils'

import config from "siteConfig"
import index from 'data/navbar.yaml'

const menuColor = (location, name) => {
  if ((location === '/' && name === 'Home') || location.match(`/${name.toLowerCase()}`)) {
    return true
  }
  return false
}

const Link = styled(GatsbyLink)`
  color: ${theme.black};
  transition: all .2s;
  border: none;

  ${({ path, name }) => menuColor(path, name) && css`
    color: ${theme.orange};
  `}
`

// On Mobile screens the link becomes bigger.
const List = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;

  ${media.xs(css`
    flex: 3;
    align-self: stretch;
    ${flex({ x: 'space-around' })}

    li {
      align-self: stretch;
      margin: 0;
      ${flex}

      a {
        align-self: stretch;
        width: 100%;
        ${flex}
      }
    }

  `)}
`

const Nav = styled.nav`
  ${flex({ x: 'space-between', y: 'center' })}

  margin: 0 auto;
  max-width: 1200px;
  min-height: 80px;
  padding: 0 20px;

  ${media.xs(css`
    padding: 0;
    border-bottom: 1px solid ${theme.lightgray};
  `)}
`

const GHLink = styled.a`
  ${hover(css`
    color: ${theme.orange};
  `)}

  ${media.xs(css`
    flex: 1;
    align-self: stretch;
    ${flex};
    border-left: 1px solid ${theme.lightgray};
  `)}

  ${media.custom(340, css`
    display: none;
  `)}
`

const ListLink = ({ to, children, location, name }) => (
  <li style={{ margin: ' 0 1rem 0' }}>
    <Link
      to={to}
      name={name}
      path={location.pathname}
    >
      {children}
    </Link>
  </li>
)

ListLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

const Navigation = ({ location }) => (
  <List>
    {index.map(i => (
      <ListLink
        key={i.title}
        location={location}
        name={i.title}
        to={i.link}
      >
        {i.title}
      </ListLink>
    ))}
  </List>
)

Navigation.propTypes = {
  location: PropTypes.object.isRequired
}

const Github = () => (
  <GHLink
    href={config.githubAPI}
    title="GitHub"
  >
    <GithubIcon style={{ fontSize: 18 }}/>
  </GHLink>
)

const Header = ({ location }) => (
  <header style={{ height: navHeight }}>
    <Nav>
      <Navigation location={location}/>
      <Github />
    </Nav>
  </header>
)

Header.propTypes = {
  location: PropTypes.object.isRequired
}

export default Header
