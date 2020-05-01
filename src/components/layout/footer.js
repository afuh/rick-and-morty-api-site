import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { useRickAndMortyStats, useSiteMeta } from '../../utils/hooks'

const StatisticsWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    width: 100%;

    span {
      font-size: ${theme.spacing._12};
      font-weight: 300;
    }

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

    background: ${theme.backBlack};
    color: ${theme.gray};
    padding: ${theme.spacing._12} 0;
    min-height: calc(${theme.navHeight}px * 2);
    width: 100%;

    .stats {
      margin: ${theme.spacing._4} ${theme.spacing._8};
      text-align: center;
    }
  `}
`

const SignWrapper = styled.div`
  ${({ theme }) => css`
    span {
      font-size: ${theme.spacing._12};
      font-weight: 200;

      a {
        font-weight: 400;
        transition: color .2s;
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

const Statistics = ({ title, count }) => (
  <div className='stats'>
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
      <span>{' '}{new Date().getFullYear()}</span>
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
