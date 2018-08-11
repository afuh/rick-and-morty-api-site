import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import styled, { css } from 'styled-components'

import config from "siteConfig"
import prismCSS from 'styles/prism'

import SEO from 'components/SEO'
import Layout from 'components/Layout'
import EditThisPage from './EditThisPage'
import Sidebar from './Sidebar'

import { media, rem } from 'styles/utils'

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

const Markdown = ({ data: { markdownRemark }, location }) => {
  const { html, frontmatter: { title }, fields: { slug } } = markdownRemark

  return (
    <Layout location={location}>
      <>
        <Helmet title={`${title} | ${config.siteTitle}`} />
        <SEO postPath={slug} postNode={markdownRemark} postSEO />
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
    markdownRemark: PropTypes.object
  }).isRequired
}

export default Markdown

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
