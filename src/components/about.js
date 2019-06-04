import React from 'react'
import PropTypes from 'prop-types'

const About = ({ html }) => (
  <article dangerouslySetInnerHTML={{ __html: html }} />
)

About.propTypes = {
  html: PropTypes.string.isRequired
}

export default About
