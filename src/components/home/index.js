import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'
import { getCharacter } from 'rickmortyapi'

import Card from './characterCard'
import Showcase from './showcase'
import Hero from './hero'

class Home extends Component {
  chars = []
  state = {
    data: []
  }
  randomChars(){
    const { stats: { characters } } = this.props
    while (this.chars.length < 8) {
      const num = Math.floor(Math.random() * (characters.info.count - 1 + 1) + 1)

      if (this.chars.indexOf(num) > - 1) continue
      this.chars[this.chars.length] = num
    }
    return this.chars
  }
  componentDidMount(){
    this.handleRequest()
  }
  handleRequest = async () => {
    const data = await getCharacter(this.randomChars())

    this.setState({ data })
  }
  render(){
    const { data } = this.state
    const { title, description } = this.props
    return (
      <>
        <Hero
          title={title}
          description={description}
        />
        <Showcase>
          {
            data.length ?
              data.map((char, i) => <Card char={char} key={i}/>) :
              <Spinner name="triangle-skew-spin" color="rgb(255, 152, 0)" />
          }
        </Showcase>
      </>
    )
  }
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired
}

export default Home
