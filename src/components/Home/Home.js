import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'

import { getCharacter } from 'rickmortyapi'
import statistics from '../../data/statistics.yaml'

import Card from './Card'

import styles from './Home.module.sass'

const Intro = ({ title, description }) => (
  <section className={styles.introWrapper} >
    <h1>{title}</h1>
    <div className={styles.subtitle}>
      <h2>{description}</h2>
      <h2>&nbsp; &nbsp; &nbsp; I got one right here, grab my terry flap&nbsp; &nbsp; &nbsp; </h2>
    </div>
  </section>
)

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const Characters = ({ children }) => (
  <section className={styles.apiSection}>
    <div className={styles.randomCardsWrapper}>
      {children}
    </div>
  </section>
)

class Home extends Component {
  count = statistics[0].count
  chars = []
  state = {
    data: []
  }
  randomChars(){
    while (this.chars.length < 8) {
      const num = Math.floor(Math.random() * (this.count - 1 + 1) + 1)

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
        <Intro
          title={title}
          description={description}
        />
        <Characters>
          {
            data.length ?
              data.map((char, i) => (
                <Card char={char} key={i}/>
              )) :
              <Spinner name="triangle-skew-spin" color="rgb(255, 152, 0)" />
          }
        </Characters>
      </>
    )
  }
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}


export default Home
