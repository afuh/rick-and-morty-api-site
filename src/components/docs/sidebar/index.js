import React from 'react'
import styled, { css } from 'styled-components'
import { useStaticQuery, graphql, Link as GatsbyLink } from 'gatsby'

import Mobile from './mobile'
import Desktop from './desktop'

const TOCWrapper = styled.div(
  ({ theme }) => css`
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style-type: none;
      }
    }

    .section {
      margin-bottom: ${theme.spacing._24};

      .title {
        font-size: ${theme.spacing._20};
        margin: 0.2rem 0 0;
        font-weight: 700;
      }

      .item {
        margin: 3px 0;
      }
    }

    .section:last-child {
      margin-bottom: 0;
    }
  `,
)

const Wrapper = styled.aside(
  ({ theme }) => css`
    #nav-desktop {
      display: block;
    }

    #nav-mobile {
      display: none;
    }

    ${theme.media.mobile(css`
      #nav-desktop {
        display: none;
      }

      #nav-mobile {
        display: block;
      }
    `)}
  `,
)

const Link = styled(GatsbyLink).attrs((p) => ({
  to: '/documentation/' + p.to,
}))`
  border-bottom: none;
`

const TOC = () => {
  const { mdx } = useStaticQuery(query)

  return (
    <TOCWrapper>
      <ul>
        {mdx.tableOfContents.items.map((section) => (
          <li key={section.url} className="section">
            <Link to={section.url} className="title">
              {section.title}
            </Link>
            <ul>
              {section.items.map((item) => (
                <li key={item.url} className="item">
                  <Link to={item.url}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </TOCWrapper>
  )
}

const Sidebar = (props) => (
  <Wrapper {...props}>
    <Mobile render={<TOC />} />
    <Desktop render={<TOC />} />
  </Wrapper>
)

export default Sidebar

const query = graphql`
  query DOCS_TOC {
    mdx(fileAbsolutePath: { regex: "/documentation/" }) {
      tableOfContents(maxDepth: 3)
    }
  }
`
