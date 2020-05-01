import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled, { css } from 'styled-components'

const Wrapper = styled.article`
  ${({ theme }) => css`
    max-width: 300px;
    overflow: hidden;
    border-radius: ${theme.spacing._8};
    margin-bottom: ${theme.spacing._12};
    box-shadow: ${theme.shadow};

    ${theme.media.phone(css`
      max-width: none;
      box-shadow: none;
      border-radius: unset;
      width: 100%;
    `)}
  `}
`

const ImgWrapper = styled.div.attrs({
  data: 'card header'
})`
  ${({ theme, isLoading }) => css`
    position: relative;
    width: 300px;
    height: 300px;

    ${theme.media.phone(css`
      width: 100%;
      height: auto;
    `)}

    .card-image {
      width: 100%;
      background: ${theme.backBlack};

      ${theme.media.phone(css`
        height: ${isLoading ? '60vh' : 'auto'};
      `)}

      img {
        margin: 0;
        opacity: ${isLoading ? 0 : 1};
        transition: opacity .5s;
      }
    }

  `}
`

const InfoWrapper = styled.div.attrs({
  data: 'card info'
})`
  ${({ theme }) => css`
    padding: ${theme.spacing._12} ${theme.spacing._12};
    height: 100%;
    color: ${theme.primary};
    background: ${theme.black};
  `}
`

const Title = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.backBlack};
    opacity: 0.8;
    position: absolute;
    bottom: 0;
    padding: ${theme.spacing._12};
  `}
`

const Name = styled.h2`
  ${({ theme }) => css`
    color: ${theme.whitesmoke};
    margin: 0;
    font-size: ${theme.spacing._24};
    font-weight: 400;
    font-stretch: expanded;
  `}
`

const Description = styled.p`
  ${({ theme }) => css`
    color: #bbb;
    margin: 0;
    font-size: ${theme.spacing._12};
  `}
`

const TextWrapper = styled.div`
  ${({ theme, divider }) => css`
    ${theme.mixins.flex({ x: 'space-between' })}
    padding: ${theme.spacing._12} 0 ${theme.spacing._8};
    flex-wrap: nowrap;

    span {
      font-size: 0.7rem;
      font-weight: 400;
      color: ${theme.gray}
    }

    p {
      width: 100%;
      padding: 0;
      margin: 0;
      font-size: 0.9rem;
      font-weight: 200;
      text-align: right;
    }

    border-bottom: ${divider && '1px solid #444'};
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
    <ImgWrapper isLoading={loading}>
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
          {'id: ' + char.id + ' - created ' + moment(char.created).fromNow()}
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
