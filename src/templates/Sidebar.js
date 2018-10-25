import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link, StaticQuery, graphql } from "gatsby"

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

const Index = styled.div`
  margin-bottom: ${rem(24)};

  ul {
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 1rem;
      ul {
        margin-bottom: 20px;
        li {
          margin: 0 1rem;
        }
      }
    }
  }

  p {
    margin: 0.2rem 0 0;
    font-size: ${rem(20)};
    font-weight: 700;
    a {
      border: none;
    }
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

const TableOfContents = () => (
  <StaticQuery
    query={query}
    render={({ md }) => (
      <Index dangerouslySetInnerHTML={{ __html: md.tableOfContents }} />
    )}
  />
)

class Sidebar extends Component {
  marginTop
  state = {
    fixed: false,
    sidebar: 0
  }
  componentDidMount(){
    this.header = document.querySelector("header")
    this.footer = document.querySelector("footer")
    this.editPage = document.querySelector("[id=edit-wrapper]")

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
          <TableOfContents />
        </Aside>
      </SidebarWrapper>
    )
  }
}

Sidebar.propTypes = {
  marginTop: PropTypes.number.isRequired
}

Sidebar.defaultProps = {
  marginTop: 20
}

export default Sidebar

const query = graphql`
  {
    md: markdownRemark(fileAbsolutePath: {regex: "/documentation/"}) {
      tableOfContents
    }
  }
`
