import React from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link as GatsbyLink } from 'gatsby'

import { rem, media } from '../../../styles'
import Mobile from './mobile'
import Desktop from './desktop'

const TOCWrapper = styled.div`
  padding-bottom: 120px;

  ul {
    padding: 0;
    margin: 0;
    li {
      list-style-type: none;
    }
  }

  .section {
    margin-bottom: 2rem;

    .title {
      margin: 0.2rem 0 0;
      font-size: ${rem(20)};
      font-weight: 700;
    }

    .item {
      margin: 0;
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

const Link = styled(GatsbyLink).attrs(p => ({
  to: '/documentation/' + p.to
}))`
  border-bottom: none;
`

const TOC = () => {
  const { mdx: { tableOfContents } } = useStaticQuery(query)

  return (
    <TOCWrapper>
      <ul>
        {tableOfContents.items.map(section => (
          <li key={section.url} className='section'>
            <Link to={section.url} className='title'>{section.title}</Link>
            <ul>
              {section.items.map(item => (
                <li key={item.url} className='item'>
                  <Link to={item.url} >{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </TOCWrapper>
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
    mdx(fileAbsolutePath: {regex: "/documentation/"}) {
      tableOfContents(maxDepth: 3)
    }
  }
`
