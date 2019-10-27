import React from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'

import { rem, media } from '../../../styles'
import Mobile from './mobile'
import Desktop from './desktop'

const TOCWrapper = styled.div`
  padding-bottom: 40px;

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

const Wrapper = styled.aside`
  #nav-desktop {
    display: block;
  }

  #nav-mobile {
    display: none;
  }

  ${media.mobile(css`
    #nav-desktop {
      display: none;
    }

    #nav-mobile {
      display: block;
    }
  `)}
`

const TOC = () => {
  const { md: { TOC } } = useStaticQuery(query)

  return (
    <TOCWrapper
      dangerouslySetInnerHTML={{ __html: TOC }}
    />
  )
}

const Sidebar = () => (
  <Wrapper>
    <Mobile render={<TOC />} />
    <Desktop render={<TOC />} />
  </Wrapper>
)

export default Sidebar

const query = graphql`
  query DOCS_TOC {
    md: markdownRemark(fileAbsolutePath: {regex: "/documentation/"}) {
      TOC: tableOfContents
    }
  }
`
