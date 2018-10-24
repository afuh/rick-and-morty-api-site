import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { GoArrowLeft as Back } from "react-icons/go"
import { getCharacter } from 'rickmortyapi'
import styled, { css } from 'styled-components'

import { navHeight, flex, media, rem, size } from 'styles/utils'

const Wrapper = styled.div`
  ${flex};
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: calc(100vh - ${navHeight});

  ${media.xs(css`
    justify-content: space-around;
  `)}
`

const MessageWrapper = styled.div`
  width: 100%;

  h1, p {
    text-align: center;
  }

  h1 {
    border: 0;
    margin: 0;
    font-size: ${rem(50)};
    font-weight: 200;

    ${media.xs(css`
      margin-top: ${rem(20)};
    `)}
  }

  p {
    margin-bottom: ${rem(6)};
    font-size: ${rem(22)};
    font-weight: 400;
  }
`

const ImageWrapper = styled.div`
  ${size("300px", "300px")}

  margin: 20px 0;

  ${media.xs(css`
    ${size("auto", "auto")}

    max-height: 300px;
  `)}

  img {
    border-radius: 50%;

    ${media.xs(css`
      border-radius: 0;
    `)}
  }
`

const IconWrapper = styled.div`
  ${media.xs(css`
    width: 100%;

    a {
      ${flex}
      width: 100%;
      padding: ${rem(20)} 0;
    }
  `)}
`

const Message = ({ name }) => (
  <MessageWrapper>
    <h1>404</h1>
    <p>Oh Jeez! there is nothing here.</p>
    <p>But I could show you a cute picture of <strong>{name}</strong>.</p>
  </MessageWrapper>
)

Message.propTypes = {
  name: PropTypes.string.isRequired
}

const Image = ({ image }) => (
  <ImageWrapper>
    {image && <img src={image} alt='🐈'/>}
  </ImageWrapper>
)

Image.propTypes = {
  image: PropTypes.string.isRequired
}

const BackIcon = () => (
  <IconWrapper>
    <Link to="/">
      <Back style={{ fontSize: "40px", marginTop: "10px" }} />
    </Link>
  </IconWrapper>
)

class ErrorMessage extends Component {
  state = {
    image: '',
    name: ''
  }
  componentDidMount(){
    this.handleRequest()
  }

  handleRequest = async () => {
    const { stats } = this.props
    const num = Math.floor(Math.random() * (stats.character - 1 + 1) + 1)

    const { image, name } = await getCharacter(num)
    this.setState({ image, name })
  }

  render() {
    const { image, name } = this.state

    return (
      <Wrapper>
        <Message name={name}/>
        <Image image={image} />
        <BackIcon />
      </Wrapper>
    )
  }
}

ErrorMessage.propTypes = {
  stats: PropTypes.object.isRequired
}

export default ErrorMessage
