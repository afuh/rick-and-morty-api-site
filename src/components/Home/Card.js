import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import styles from './Home.module.sass'

const Text = ({ title, data, last }) => (
  <>
    <div className={styles.textWrapper} style={{ padding: "6px 0" }}>
      <span>{title.toUpperCase()}</span>
      <p>{data}</p>
    </div>
    {!last && <hr style={{ background: "#444" }}/>}
  </>
)

Text.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  last: PropTypes.bool
}

const CardImg = ({ char }) => (
  <div className={styles.card__img} data='card header'>
    <img src={char.image} alt={char.name}/>
    <div className={styles.card__title}>
      <h2>{char.name}</h2>
      <p>{"id: " + char.id + " - created " + moment(char.created).fromNow()}</p>
    </div>
  </div>
)

CardImg.propTypes = {
  char: PropTypes.object.isRequired
}

const CardBody = ({ char }) => (
  <div className={styles.card__description} data='card info'>
    <Text title='Status' data={char.status}/>
    <Text title='Species' data={!char.type ? char.species : char.species + ', ' + char.type} />
    <Text title='Gender' data={char.gender} />
    <Text title='Origin' data={char.origin.name} />
    <Text title='Last location' data={char.location.name} last/>
  </div>
)

CardBody.propTypes = {
  char: PropTypes.object.isRequired
}

const Card = ({ char }) => (
  <article className={styles.card__wrapper}>
    <CardImg char={char} />
    <CardBody char={char} />
  </article>
)

Card.propTypes = {
  char: PropTypes.object.isRequired
}

export default Card
