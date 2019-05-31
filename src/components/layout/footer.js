import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

import { flex, media, hover, rem } from '../../styles'
import { useRickAndMortyStats, useSiteMeta } from '../../utils/hooks'

const StatisticsWrapper = styled.div`
  ${flex}
  width: 100%;

  span {
    font-size: 14px;
    font-weight: 300;
  }

  ${media.xs(css`
    justify-content: space-around;
  `)}
`

const Wrapper = styled.footer`
  ${flex}
  flex-direction: column;
  flex-wrap: nowrap;

  background: ${({ theme }) => theme.backBlack};
  color: ${({ theme }) => theme.gray};

  padding: 10px 0;
  width: 100%;
  min-height: calc(${({ theme }) => theme.navHeight}px * 2);
`

const SignWrapper = styled.div`
  span {
    font-size: ${rem(13)};
    font-weight: 200;

    a {
      font-weight: 400;
      transition: color .2s;
      color: ${({ theme }) => theme.whitesmoke};
      border-bottom: 1px solid ${({ theme }) => theme.orange};

      ${hover(css`
        color: ${({ theme }) => theme.orange};
        border-bottom: none;
      `)}
    }
  }
`

const Statistics = ({ title, count }) => (
  <div style={{ margin: "4px 8px" }}>
    <span>
      {title.toUpperCase()}: {count}
    </span>
  </div>
)

Statistics.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

const Stats = () => {
  const stats = useRickAndMortyStats()

  return (
    <StatisticsWrapper>
      {Object.keys(stats).map((endpoint, i) => (
        <Statistics
          key={i}
          title={endpoint}
          count={stats[endpoint].info.count}
        />
      ))}
    </StatisticsWrapper>
  )
}

const Sign = () => {
  const { author } = useSiteMeta()

  return (
    <SignWrapper>
      <span >
        ❮❯ by <a href={author.site}>{author.name}</a>
      </span>
      <span>{` `}{new Date().getFullYear()}</span>
    </SignWrapper>
  )
}

const Footer = () => (
  <Wrapper>
    <Stats />
    <Sign />
  </Wrapper>
)

export default Footer
