import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled, { css } from 'styled-components'

import { flex, rem, media } from '../../styles'

const Wrapper = styled.article`
  max-width: 300px;
  border-radius: ${rem(10)};
  overflow: hidden;
  margin-bottom: ${rem(10)};
  box-shadow: ${({ theme }) => theme.shadow};

  ${media.phone(css`
    max-width: none;
    box-shadow: none;
    border-radius: unset;
    width: 100%;
  `)}
`

const ImgWrapper = styled.div.attrs({
  data: 'card header'
})`
  position: relative;
  width: 300px;
  height: 300px;

  ${media.phone(css`
    width: 100%;
    height: auto;
  `)}

  .card-image {
    width: 100%;
    background: ${({ theme }) => theme.backBlack};

    ${media.phone(css`
      height: ${p => p.loading ? '60vh' : 'auto'};
    `)}

    img {
      margin: 0;
      opacity: ${p => p.loading ? 0 : 1};
      transition: opacity .5s;
    }
  }
`

const InfoWrapper = styled.div.attrs({
  data: 'card info'
})`
  padding: ${rem(20)};
  height: 100%;
  color: ${({ theme }) => theme.orange};
  background: ${({ theme }) => theme.black};
`

const Title = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backBlack};
  opacity: 0.8;
  position: absolute;
  bottom: 0;
  padding: ${rem(10)};
`

const Name = styled.h2`
  color: ${({ theme }) => theme.whitesmoke};
  margin: 0;
  font-size: ${rem(26)};
  font-weight: 400;
  font-stretch: expanded;
`

const Description = styled.p`
  color: #bbb;
  margin: 0;
  font-size: ${rem(14)};
`

const TextWrapper = styled.div`
  ${flex({ x: 'space-between' })}
  flex-wrap: nowrap;
  padding: ${rem(12)} 0 ${rem(6)};

  span {
    font-size: 0.7rem;
    font-weight: 400;
    color: ${({ theme }) => theme.gray}
  }

  p {
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 0.9rem;
    font-weight: 200;
    text-align: right;
  }

  ${({ divider }) => divider && css`
    border-bottom: 1px solid #444;
  `}
`

const Text = ({ title, data, last }) => (
  <TextWrapper divider={!last}>
    <span>{title.toUpperCase()}</span>
    <p>{data}</p>
  </TextWrapper>
)

Text.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  last: PropTypes.bool
}

const CardImg = ({ char }) => {
  const [loading, setLoading] = useState(true)

  return (
    <ImgWrapper loading={loading}>
      <div className='card-image'>
        <img
          onLoad={() => setLoading(false)}
          src={char.image}
          alt={char.name}
        />
      </div>
      <Title>
        <Name>{char.name}</Name>
        <Description>
          {"id: " + char.id + " - created " + moment(char.created).fromNow()}
        </Description>
      </Title>
    </ImgWrapper>
  )
}

CardImg.propTypes = {
  char: PropTypes.object.isRequired
}

const CardInfo = ({ char }) => (
  <InfoWrapper>
    <Text title='Status' data={char.status}/>
    <Text title='Species' data={!char.type ? char.species : char.species + ', ' + char.type} />
    <Text title='Gender' data={char.gender} />
    <Text title='Origin' data={char.origin.name} />
    <Text title='Last location' data={char.location.name} last/>
  </InfoWrapper>
)

CardInfo.propTypes = {
  char: PropTypes.object.isRequired
}

const Card = ({ char }) => (
  <Wrapper>
    <CardImg char={char} />
    <CardInfo char={char} />
  </Wrapper>
)

Card.propTypes = {
  char: PropTypes.object.isRequired
}

export default Card
