import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'
import moment from 'moment'

import { shlaAPI } from '../../utils/api'
import statistics from '../../data/statistics.yaml'

import styles from './Home.module.sass'

const Intro = ({ title, description }) => (
  <div className={styles.introWrapper} >
    <h1>{title}</h1>
    <div className={styles.subtitle}>
      <h2>{description}</h2>
      <h2>&nbsp; &nbsp; &nbsp; I got one right here, grab my terry flap&nbsp; &nbsp; &nbsp; </h2>
    </div>
  </div>
)

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

const Text = ({ title, data, last }) => (
  <div>
    <div className={styles.textWrapper} style={{ padding: "6px 0" }}>
      <span>{title.toUpperCase()}</span>
      <p>{data}</p>
    </div>
    {!last && <hr style={{ background: "#444" }}/>}
  </div>
)

Text.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  last: PropTypes.bool
}

const Card = ({ char }) => (
  <article className={styles.card__wrapper}>
    <div style={{ position: "relative", maxWidth: 300, maxHeight: 300 }} data='card header'>
      <img src={char.image} alt={char.name}/>
      <div className={styles.card__title}>
        <h2>{char.name}</h2>
        <p>{"id: " + char.id + " - created " + moment(char.created).fromNow()}</p>
      </div>
    </div>
    <div className={styles.card__description} data='card info'>
      <Text title='Status' data={char.status}/>
      <Text title='Species' data={!char.type ? char.species : char.species + ', ' + char.type} />
      <Text title='Gender' data={char.gender} />
      <Text title='Origin' data={char.origin.name} />
      <Text title='Last location' data={char.location.name} last/>
    </div>
  </article>
)

Card.propTypes = {
  char: PropTypes.object.isRequired
}

class Home extends Component {
  count = statistics[0].count
  chars = []
  state = {
    data: []
  }
  randomNums(){
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
  handleRequest = () => {
    shlaAPI.get(`/character/${this.randomNums()}`).then(({ data }) => this.setState({ data }))
  }
  render(){
    const { data } = this.state
    const { title, description } = this.props

    return (
      <div>
        <Intro title={title} description={description} />
        <section className={styles.apiSection}>
          <div className={styles.randomCardsWrapper}>
            {
              data.length === 8 ?
                data.map((char, i) => <Card char={char} key={i}/> ) :
                <Spinner name="triangle-skew-spin" color="rgb(255, 152, 0)" />
            }
          </div>
        </section>
      </div>
    )
  }
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}


export default Home
