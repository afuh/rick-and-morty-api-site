import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import styled, { css } from 'styled-components'

import Layout from '../components/layout'
import EditThisPage from '../components/editThisPage'
import Sidebar from '../components/sidebar/'

import { prismCSS, media } from '../styles'
import { useSiteMeta } from '../utils/hooks'

const Docs = styled.div`
  display: flex;
  flex-wrap: nowrap;

  ${media.phone(css`
    display: block;
  `)}

  ${prismCSS}
`

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`

const Article = styled.article`
  font-variant-ligatures: none;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  text-decoration-skip-ink: auto;

  li {
    list-style-type: initial;
  }
`

const Markdown = ({ data: { md } }) => {
  const { html, excerpt, frontmatter: { title, cover }, fields: { slug } } = md
  const meta = useSiteMeta()

  return (
    <Layout
      seo={{
        title: `${title} | ${meta.title}`,
        description: excerpt,
        pathname: slug,
        image: cover
      }}
    >
      <>
        <Content>
          {slug.includes('documentation') ?
            <Docs>
              <Sidebar />
              <Article dangerouslySetInnerHTML={{ __html: html }} />
            </Docs> :
            <Article dangerouslySetInnerHTML={{ __html: html }} />
          }
        </Content>
        <EditThisPage page={slug} />
      </>
    </Layout>
  )
}

Markdown.propTypes = {
  data: PropTypes.shape({
    md: PropTypes.object
  }).isRequired
}

export default Markdown

export const pageQuery = graphql`
  query ($slug: String!) {
    md: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        cover
      }
      fields {
        slug
      }
    }
  }
`
