import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import styled, { css } from 'styled-components'

import { navHeight, flex, media, hover, rem } from 'styles/utils'

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

const FoooterWrapper = styled.footer`
  ${flex}
  flex-direction: column;
  flex-wrap: nowrap;

  background: ${({ theme }) => theme.backBlack};
  color: ${({ theme }) => theme.gray};

  padding: 10px 0;
  width: 100%;
  min-height: calc(${navHeight} * 2);
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
      {`${title}s`.toUpperCase()}: {count}
    </span>
  </div>
)

Statistics.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

const Numbers = ({ stats }) => (
  <StatisticsWrapper>
    {Object.keys(stats).map((endpoint, i) => (
      <Statistics
        key={i}
        title={endpoint}
        count={stats[endpoint]}
      />
    ))}
  </StatisticsWrapper>
)

Numbers.propTypes = {
  stats: PropTypes.object.isRequired
}

const Sign = ({ author }) => (
  <SignWrapper>
    <span >
      ❮❯ by <a href={author.site}>{author.name}</a>
    </span>
    <span>{` `}{new Date().getFullYear()}</span>
  </SignWrapper>
)

Sign.propTypes = {
  author: PropTypes.object.isRequired
}

const Footer = () => (
  <StaticQuery
    query={query}
    render={({
      stats,
      site: { meta: { author } }
    }) => (
      <FoooterWrapper>
        <Numbers stats={stats}/>
        <Sign author={author}/>
      </FoooterWrapper>
    )}
  />
)

const query = graphql`
  {
    stats: apiStatistics {
      character
      location
      episode
    }
    site {
      meta: siteMetadata {
        author {
          name
          site
        }
      }
    }
  }
`



export default Footer
