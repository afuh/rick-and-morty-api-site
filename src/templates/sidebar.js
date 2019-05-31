import React from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"

import { media, rem } from '../styles'
import { useSidebar } from '../utils/hooks'

const Wrapper = styled.div`
  position: relative;
  min-width: 210px;

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
`

const TOCWrapper = styled.div`
  margin-bottom: 60px;

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

const Sidebar = () => {
  const { fixed, bottom, top } = useSidebar()
  const { md: { TOC } } = useStaticQuery(query)

  return (
    <Wrapper>
      <Aside
        margin={top}
        fixed={fixed}
        hide={bottom}
      >
        <TOCWrapper dangerouslySetInnerHTML={{ __html: TOC }} />
      </Aside>
    </Wrapper>
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
