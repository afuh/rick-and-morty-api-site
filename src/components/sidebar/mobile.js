import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"
import Icon from "./icon-svg"

import { rem } from '../../styles'

const TOCWrapper = styled.div`
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

const Wrapper = styled.div`
  height: 100vh;
  position: fixed;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 999;
  pointer-events: none;

  transform: translateX(-100%);
  opacity: 0;

  ${({ isOpen }) => isOpen && css`
    transform: translateX(0);
    pointer-events: auto;
    opacity: 1;
  `}

  transition: all 0.3s ease;
`

const Nav = styled.nav`
  padding: 5%;
  padding-left: 30px;
  margin-bottom: 20px;
  transform: translateX(-100%);

  ${({ isOpen }) => isOpen && css`
    transform: translateX(0);
  `}

  transition: transform 0.5s ease;
`

const Button = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background: ${({ theme }) => theme.orange};
  color: #fff;
  border: 1px solid ${({ theme }) => theme.orange};
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px;
  font-size: 20px;
  user-select: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Sidebar = () => {
  const { md: { TOC } } = useStaticQuery(query)
  const tocWrapper = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const anchors = tocWrapper.current.querySelectorAll("a")
    const appRoot = document.querySelector("#___gatsby")
    appRoot.style.overflow = 'hidden'

    anchors.forEach(anchor => {
      anchor.addEventListener("click", () => setIsOpen(false))
    })

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener("click", setIsOpen)
      })
    }
  })

  return (
    <div id='sidebar-mobile'>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <Icon
          css={`transform: rotate(${isOpen ? "45deg" : 0})`}
        />
      </Button>
      <Wrapper isOpen={isOpen}>
        <Nav isOpen={isOpen}>
          <TOCWrapper
            ref={tocWrapper}
            dangerouslySetInnerHTML={{ __html: TOC }}
            id='TOC-wrapper'
          />
        </Nav>
      </Wrapper>
    </div>
  )
}

export default Sidebar

const query = graphql`
  {
    md: markdownRemark(fileAbsolutePath: {regex: "/documentation/"}) {
      TOC: tableOfContents
    }
  }
`
