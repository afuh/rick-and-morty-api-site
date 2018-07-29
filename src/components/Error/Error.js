import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Back from "react-icons/lib/go/arrow-left"
import { getCharacter } from 'rickmortyapi'

import statistics from '../../data/statistics.yaml'

import styles from './Error.module.sass'

const Message = ({ name }) => (
  <>
    <div className={styles.headerWrapper}>
      <h1>404</h1>
      <p className={styles.message}>Oh Jeez! there is nothing here.</p>
    </div>
    <div>
      <p className={styles.message}>But I could show you a cute picture of <strong>{name}</strong>.</p>
    </div>
  </>
)

Message.propTypes = {
  name: PropTypes.string.isRequired
}

const Image = ({ image }) => (
  <div className={styles.imgWrapper}>
    {image && <img src={image} className={styles.img} alt='🐈'/>}
  </div>
)

Image.propTypes = {
  image: PropTypes.string.isRequired
}


const BackIcon = () => (
  <div className={styles.goBackButton}>
    <Link to="/"><Back style={{ fontSize: "40px", marginTop: "10px" }} /></Link>
  </div>
)

class ErrorMessage extends Component {
  count = statistics[0].count
  state = {
    image: '',
    name: ''
  }
  componentDidMount(){
    this.handleRequest()
  }

  handleRequest = async () => {
    const num = Math.floor(Math.random() * (this.count - 1 + 1) + 1)

    const { image, name } = await getCharacter(num)
    this.setState({ image, name })
  }

  render() {
    const { image, name } = this.state

    return (
      <main className={styles.wrapper}>
        <Message name={name}/>
        <Image image={image} />
        <BackIcon />
      </main>
    )
  }
}

export default ErrorMessage
