import React from 'react'
import styled, { css } from 'styled-components'
import { GoMarkGithub, GoHeart } from 'react-icons/go'
import { FaTwitter } from 'react-icons/fa'
import { Link } from 'gatsby'

import { useRickAndMortyStats, useSiteMeta, useServerStatus } from '../../utils/hooks'
import { ExternalLink, Caption } from '../shared'

const Wrapper = styled.footer`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    background: ${theme.backBlack};
    color: ${theme.gray};
    padding: ${theme.spacing._24} 0;
    min-height: calc(${theme.navHeight}px * 2);
    width: 100%;

    .margin-top {
      margin-top: ${theme.spacing._20};
    }

    ul {
      ${theme.mixins.flex}
      margin: 0;
      padding: 0;
      width: 100%;

      li {
        margin: 0;

        & + li {
          margin-left: ${theme.spacing._24};
        }

        .footer-icon {
          vertical-align: middle;
        }

        span {
          margin: 0;
        }

        a {
          color: ${theme.gray};
          border-bottom: none;
          ${theme.mixins.hover(css`
            color: ${theme.primary};
          `)};
        }
      }
    }
  `}
`

const SignWrapper = styled.div`
  ${({ theme }) => css`
    span {
      font-size: ${theme.spacing._12};

      a {
        font-weight: 400;
        transition: color 0.2s;
        color: ${theme.whitesmoke};
        border-bottom: 1px solid ${theme.primary};

        ${theme.mixins.hover(css`
          color: ${theme.primary};
          border-bottom: none;
        `)}
      }
    }
  `}
`

const Stats = () => {
  const stats = useRickAndMortyStats()

  return (
    <ul>
      {Object.keys(stats).map((endpoint) => (
        <li key={endpoint}>
          <Caption>
            {endpoint}: {stats[endpoint].info.count}
          </Caption>
        </li>
      ))}
    </ul>
  )
}

const Status = styled(ExternalLink).attrs({
  'data-testid': 'server-status',
})`
  ${({ theme, isFailling }) => css`
    ${theme.mixins.flex}
    color: ${theme.gray};

    .stats {
      margin-left: 0;
    }

    .server-icon {
      height: ${theme.spacing._8};
      width: ${theme.spacing._8};
      border-radius: 50%;
      background: ${isFailling ? theme.red : theme.green};
    }
  `}
`

const ServerStatus = () => {
  const { status } = useSiteMeta()
  const { data, loading } = useServerStatus()

  return (
    <Status isFailling={!loading && data?.last_status !== 200} href={status.site}>
      <Caption>server status</Caption>
      {data?.last_status && <span className="server-icon" />}
    </Status>
  )
}

const Sign = () => {
  const { author } = useSiteMeta()

  return (
    <SignWrapper>
      <span>
        ❮❯ by <a href={author.site}>{author.name}</a>
      </span>
      <span> {new Date().getFullYear()}</span>
    </SignWrapper>
  )
}

const Icons = () => {
  const { github, userTwitter } = useSiteMeta()

  const footerLinks = [
    { to: github.api, Icon: GoMarkGithub, title: 'GitHub' },
    { to: `https://twitter.com/${userTwitter}`, Icon: FaTwitter, title: 'Twitter' },
    { to: '/help-us', Icon: GoHeart, title: 'Help Us' },
  ]

  return (
    <ul className="margin-top">
      {footerLinks.map(({ to, title, Icon }) => (
        <li key={to}>
          {to.startsWith('https') ? (
            <ExternalLink href={to} title={title} aria-label={title.toLocaleLowerCase()}>
              <Icon className="footer-icon" />
            </ExternalLink>
          ) : (
            <Link to={to} title={title} aria-label={title.toLocaleLowerCase()}>
              <Icon className="footer-icon" />
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

const Footer = () => (
  <Wrapper>
    <Stats />
    <ServerStatus />
    <Icons />
    <Sign />
  </Wrapper>
)

export default Footer
