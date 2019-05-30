import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import styled, { css } from 'styled-components'

import Layout from '../components/layout'
import EditThisPage from './editThisPage'
import Sidebar from './sidebar'

import prismCSS from '../styles/prism'
import { media, rem } from '../styles/utils'
import { useSiteMeta } from '../utils/hooks'

const About = styled.div`
  ${media.custom(890, css`
    padding: 0 ${rem(20)}
  `)}
`

const Docs = styled.div`
  display: flex;
  flex-wrap: nowrap;

  width: 100%;
  z-index: 1;

  ${prismCSS}

  ${media.custom(890, css`
    padding: 0 ${rem(20)};
    display: block;
  `)}
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 1170px;
  padding-left: ${rem(20)};

  article li {
    list-style-type: initial;
  }

  ${media.custom(890, css`
    padding: 0;
  `)}

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
              <Sidebar marginTop={20}/>
              <article dangerouslySetInnerHTML={{ __html: html }} />
            </Docs> :
            <About>
              <article dangerouslySetInnerHTML={{ __html: html }} />
            </About>
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
