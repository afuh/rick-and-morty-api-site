import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from "gatsby"

import index from '../data/docs-index.yaml'

import { media, rem } from 'styles/utils'

const SidebarWrapper = styled.div`
  position: relative;
  min-width: ${rem(210)};

  ${media.custom(890, css`
    display: none;
  `)}

  border-right: 1px solid hsla(0,0%,0%,0.07);
  margin-right: 25px;
`

const Aside = styled.aside`
  overflow-y: scroll;
  position: relative;
  margin-top: ${({ margin }) => margin}px;

  ${({ fixed, hide }) => fixed && css`
    position: fixed;
    top: 0;
    max-height: ${hide !== 0 ? `calc(100vh - ${hide}px)` : "100vh"};
  `}

  ${'' /* &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: ${rem(4)};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: ${rem(4)};
    background: ${theme.orange}
  } */}
`

const SectionWrapper = styled.div`
  margin-bottom: ${rem(24)};

  h3 {
     margin: 0 0 0.2rem;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  li {
     margin: 0 1rem;
  }
`


const ListLink = ({ to, children }) => (
  <li >
    <Link to={to}>
      {children}
    </Link>
  </li>
)

ListLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}


const Section = ({ title, items }) => (
  <SectionWrapper>
    <h3>
      {title}
    </h3>
    <ul>
      {items.map(item => (
        <ListLink
          to={item.link}
          key={item.title}
        >
          {item.title}
        </ListLink>
      ))}
    </ul>
  </SectionWrapper>
)

Section.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}

class Sidebar extends Component {
  marginTop
  state = {
    fixed: false,
    sidebar: 0
  }
  componentDidMount(){
    this.header = document.querySelector("header")
    this.footer = document.querySelector("footer")
    this.editPage = document.querySelector("[class*=footer__wrapper]")

    setTimeout(() => {
      window.addEventListener('scroll', this.handleScroll)
      this.handleScroll()
    }, 500)

  }
  handleScroll = () => {
    const viewBottom = window.scrollY + window.innerHeight
    if (window.scrollY >= this.header.offsetHeight) {
      this.setState({ fixed: true })
    } else {
      this.setState({ fixed: false })
    }

    if (viewBottom >= this.footer.offsetTop){
      this.setState({
        sidebar: viewBottom - (this.footer.offsetTop - this.editPage.offsetHeight - this.props.marginTop)
      })
    }
    else {
      this.setState({ sidebar: 0 })
    }
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }
  render(){
    const { fixed, sidebar } = this.state

    return (
      <SidebarWrapper>
        <Aside
          margin={this.props.marginTop}
          fixed={fixed}
          hide={sidebar}
        >
          {index.map(section => (
            <Section {...section} key={section.title} />
          ))}
        </Aside>
      </SidebarWrapper>
    )
  }
}

Sidebar.propTypes = {
  marginTop: PropTypes.number.isRequired
}

Sidebar.defaultPRops = {
  marginTop: 20
}

export default Sidebar
