import React from 'react'
import PropTypes from 'prop-types'

import styles from './Footer.module.sass'
import statistics from '../../data/statistics.yaml'

const Statistics = ({ title, count }) => (
  <div style={{ margin: "4px 8px" }}>
    <span className={styles.counts}>
      {title.toUpperCase()}: {count}
    </span>
  </div>
)

Statistics.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
}

const Numbers = () => (
  <div className={styles.statistics}>
    {statistics.map((res, i) => (
      <Statistics
        key={i}
        title={res.title}
        count={res.count}
      />
    ))}
  </div>
)

const Sign = () => (
  <div>
    <span>
      ❮❯ by <a href="http://axelfuhrmann.com/">Axel Fuhrmann</a>
    </span>
    <span>{` `}{new Date().getFullYear()}</span>
  </div>
)

const Footer = () => (
  <footer className={styles.wrapper}>
    <Numbers />
    <Sign />
  </footer>
)


export default Footer
