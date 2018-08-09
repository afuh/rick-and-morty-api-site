import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import data from 'data/statistics.yaml'

import { navHeight, flex, media, theme, hover, rem } from 'styles/utils'

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

  background: ${theme.backBlack};
  color: ${theme.gray};

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
      color: whitesmoke;
      border-bottom: 1px solid ${theme.orange};

      ${hover(css`
        color: ${theme.orange};
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

const Numbers = () => (
  <StatisticsWrapper>
    {data.map((res, i) => (
      <Statistics
        key={i}
        title={res.title}
        count={res.count}
      />
    ))}
  </StatisticsWrapper>
)

const Sign = () => (
  <SignWrapper>
    <span >
      ❮❯ by <a href="http://axelfuhrmann.com/">Axel Fuhrmann</a>
    </span>
    <span>{` `}{new Date().getFullYear()}</span>
  </SignWrapper>
)

const Footer = () => (
  <FoooterWrapper>
    <Numbers />
    <Sign />
  </FoooterWrapper>
)


export default Footer
