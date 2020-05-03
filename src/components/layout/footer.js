import React from 'react'
import styled, { css } from 'styled-components'

import { useRickAndMortyStats, useSiteMeta, useServerStatus } from '../../utils/hooks'
import { ExternalLink, Caption } from '../shared'

const StatisticsWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    width: 100%;

    ${theme.media.phone(css`
      justify-content: space-around;
    `)}
  `}
`

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
    <StatisticsWrapper>
      {Object.keys(stats).map((endpoint) => (
        <Caption key={endpoint}>
          {endpoint}: {stats[endpoint].info.count}
        </Caption>
      ))}
    </StatisticsWrapper>
  )
}

const Status = styled(ExternalLink).attrs({
  href: 'https://status.rickandmortyapi.com',
})`
  ${({ theme, isFailling, red = '#d63d2e', green = '#55cc44' }) => css`
    ${theme.mixins.flex}
    color: ${theme.gray};

    .stats {
      margin-left: 0;
    }

    .server-icon {
      height: ${theme.spacing._12};
      width: ${theme.spacing._12};
      border-radius: 50%;
      background: ${isFailling ? red : green};
    }
  `}
`

const ServerStatus = () => {
  const { data, loading } = useServerStatus()

  return (
    <Status isFailling={!loading && data?.last_status !== 200}>
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

const Footer = () => (
  <Wrapper>
    <Stats />
    <ServerStatus />
    <Sign />
  </Wrapper>
)

export default Footer
