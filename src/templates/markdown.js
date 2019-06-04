import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import styled from 'styled-components'

import Layout from '../components/layout'
import EditThisPage from '../components/editThisPage'
import Docs from '../components/docs'
import About from '../components/about'

import { useSiteMeta } from '../utils/hooks'

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  font-variant-ligatures: none;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  text-decoration-skip-ink: auto;

  article li {
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
            <Docs html={html} /> :
            <About html={html} />
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
