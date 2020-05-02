import React from 'react'
import PropTypes from 'prop-types'

import { useRickAndMortyStats } from '../utils/hooks'

const Count = ({ model }) => {
  const stats = useRickAndMortyStats()
  return <code className='language-text'>{stats[model].info.count}</code>
}

Count.propTypes = {
  model: PropTypes.string.isRequired
}

Count.defaultProps = {
  model: 'characters'
}

export default Count
