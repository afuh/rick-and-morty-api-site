import React from 'react'
import PropTypes from 'prop-types'

import { useRickAndMortyStats } from '../utils/hooks'

const Count = ({ model }) => {
  const stats = useRickAndMortyStats()
  return <span>{stats[model].info.count}</span>
}

Count.propTypes = {
  model: PropTypes.string.isRequired
}

Count.defaultProps = {
  model: 'characters'
}

export default Count
