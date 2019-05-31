import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { GoMarkGithub as GithubIcon } from "react-icons/go"
import styled, { css } from 'styled-components'

import { flex, media, hover } from '../../styles'
import { useSiteMeta } from '../../utils/hooks'

const Link = styled(GatsbyLink)`
  color: ${({ theme }) => theme.black};
  transition: all .2s;
  border: none;

  &.active {
    color: ${({ theme }) => theme.orange};
  }
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
    border-bottom: 1px solid ${({ theme }) => theme.lightgray};
  `)}
`

const GHLink = styled.a.attrs({
  target: "_blank",
  rel: "nofollow noopener noreferrer"
})`
  ${hover(css`
    color: ${({ theme }) => theme.orange};
  `)}

  ${media.xs(css`
    flex: 1;
    align-self: stretch;
    ${flex};
    border-left: 1px solid ${({ theme }) => theme.lightgray};
  `)}

  ${media.custom(340, css`
    display: none;
  `)}
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
      title="GitHub"
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
