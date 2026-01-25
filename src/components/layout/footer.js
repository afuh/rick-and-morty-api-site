import React from 'react'
import styled, { css } from 'styled-components'
import { GoMarkGithub, GoHeart } from 'react-icons/go'
import { Link } from 'gatsby'

import { useRickAndMortyStats, useSiteMeta, useServerStatus } from '../../utils/hooks'
import { ExternalLink, Caption } from '../shared'
import Netlify from '../../assets/svg/netlify-badge-dark.svg'
import Stellate from '../../assets/svg/stellate-light.svg'

const SignWrapper = styled.div(
  ({ theme }) => css`
    span {
      font-size: ${theme.spacing._12};

      a {
        font-weight: bold;
        transition: color 0.2s;
        color: ${theme.whitesmoke};
        border-bottom: 1px solid ${theme.primary};

        ${theme.mixins.hover(css`
          color: ${theme.primary};
          border-bottom: none;
        `)}
      }
    }
  `,
)

const Wrapper = styled.footer(
  ({ theme }) => css`
    ${theme.mixins.flex}
    flex-direction: column;
    flex-wrap: nowrap;
    position: relative;
    background: ${theme.backBlack};
    color: ${theme.gray};
    padding: ${theme.spacing.rem(72)} 0;
    min-height: calc(${theme.navHeight}px * 2);
    width: 100%;

    .mt {
      margin-top: ${theme.spacing._20};
    }

    ul {
      ${theme.mixins.flex}
      flex-wrap: wrap;
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
  `,
)

const Stats = () => {
  const stats = useRickAndMortyStats()

  return (
    <ul>
      {Object.keys(stats).map((endpoint) => (
        <li key={endpoint}>
          <Link to={`/api/${endpoint.slice(0, -1)}`} title={endpoint}>
            <Caption>
              {endpoint}: {stats[endpoint].info.count}
            </Caption>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const Status = styled(ExternalLink).attrs({
  'data-testid': 'server-status',
})`
  ${({ theme, isFailing }) => css`
    ${theme.mixins.flex}
    color: ${theme.gray};

    .stats {
      margin-left: 0;
    }

    .server-icon {
      height: ${theme.spacing._8};
      width: ${theme.spacing._8};
      border-radius: 50%;
      background: ${isFailing ? theme.red : theme.green};
    }
  `}
`

const ServerStatus = () => {
  const { status } = useSiteMeta()
  const { data, loading } = useServerStatus()

  return (
    <Status isFailing={!loading && data?.last_status !== 200} href={status.site}>
      <Caption>server status</Caption>
      {data?.last_status && <span className="server-icon" />}
    </Status>
  )
}

const Copyright = () => {
  const { author } = useSiteMeta()

  return (
    <SignWrapper className="mt">
      <span>
        ❮❯ by <a href={author.site}>{author.name}</a>
      </span>
      <span> {new Date().getFullYear()}</span>
    </SignWrapper>
  )
}

const Icons = () => {
  const { github } = useSiteMeta()

  const footerLinks = [
    { to: github.api, Icon: GoMarkGithub, title: 'GitHub' },
    { to: '/support-us', Icon: GoHeart, title: 'Support Us' },
  ]

  return (
    <ul className="mt">
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

const Logos = () => {
  const data = [
    {
      to: 'https://www.netlify.com',
      Svg: Netlify,
      props: { style: { marginRight: 32 }, ariaLabel: 'Netlify', alt: 'Deploys by Netlify' },
    },
    { to: 'https://stellate.co/?ref=powered-by', Svg: Stellate, props: { ariaLabel: 'Stellate' } },
  ]

  return (
    <div className="mt">
      {data.map(({ to, Svg, props }) => (
        <ExternalLink key={to} href={to} {...props}>
          <Svg />
        </ExternalLink>
      ))}
    </div>
  )
}

const Footer = () => (
  <Wrapper>
    <Stats />
    <ServerStatus />
    <Logos />
    <Icons />
    <Copyright />
  </Wrapper>
)

export default Footer
