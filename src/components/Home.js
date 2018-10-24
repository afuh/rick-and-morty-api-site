import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-spinkit'
import { getCharacter } from 'rickmortyapi'
import styled, { css } from 'styled-components'

import Card from './CharacterCard'

import { flex, rem, media, navHeight } from 'styles/utils'

const HeroWrapper = styled.section`
  ${flex}
  flex-direction: column;
  height: 40vh;
  text-align: center;

  ${media.xs(css`
    flex-wrap: wrap;
    height: auto;
    margin-top: ${rem(40)};
  `)}
`

const SubTitleWrapper = styled.div`
  padding: ${rem(5)} ${rem(4)} 0;
  background: ${({ theme }) => theme.backBlack};
  transform: skew(-2deg) translateY(-6px);

  ${media.sm(css`
    background: #fff;
  `)}
`

const headers = css`
  margin: 0;
  text-transform: uppercase;
  line-height: 0.75em;
  color: ${({ theme }) => theme.backBlack};
  border: none;

  ${media.sm(css`
    line-height: 1;
    padding: 0 ${rem(12)};
  `)}

  ${media.xs(css`
    margin: ${rem(10)} 0;
  `)}
`

const Title = styled.h1`
  ${headers}

  font-size: ${rem(60)};

  ${media.xs(css`
    font-size: ${rem(40)};
  `)}
`

const SubTitle = styled.h2`
  ${headers}

  font-size: ${rem(30)};
  color: ${({ theme }) => theme.orange};
  transform: skew(2deg);

  ${media.xs(css`
    font-size: ${rem(20)};
  `)}
`
const HiddenSubTitle = styled(SubTitle)`
  position: absolute;
  padding: 0 ${rem(4)};
  width: 100%;
  top: 4px;
  left: 0;
  color: transparent;

  &::selection {
    background: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.backBlack};
  }
`

const Hero = ({ title, description }) => (
  <HeroWrapper>
    <Title>{title}</Title>
    <SubTitleWrapper>
      <SubTitle>{description}</SubTitle>
      <HiddenSubTitle>
        &nbsp; &nbsp; &nbsp; I got one right here, grab my terry flap&nbsp; &nbsp; &nbsp;
      </HiddenSubTitle>
    </SubTitleWrapper>
  </HeroWrapper>
)

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}


const ShowcaseWrapper = styled.section`
  ${flex}

  padding: ${rem(30)};
  background: ${({ theme }) => theme.backBlack};
  min-height: calc(60vh - ${navHeight});

  ${media.xs(css`
    padding: ${rem(30)} 0;
  `)}
`

const ShowcaseInner = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1260px;
  min-height: 40vh;
`

const Showcase = ({ children }) => (
  <ShowcaseWrapper>
    <ShowcaseInner>
      {children}
    </ShowcaseInner>
  </ShowcaseWrapper>
)

class Home extends Component {
  chars = []
  state = {
    data: []
  }
  randomChars(){
    const { stats } = this.props
    while (this.chars.length < 8) {
      const num = Math.floor(Math.random() * (stats.character - 1 + 1) + 1)

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
