import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import EditIcon from "react-icons/lib/go/pencil"

import config from '../../config/SiteConfig'

import SEO from '../components/SEO/SEO'
import Layout from '../components/Layout'
import Sidebar from './Sidebar'

import styles from './markdown.module.sass'

const EditThisPage = ({ page }) => (
  <div className={styles.footer__wrapper} >
    <a className={`edit-page ${styles.footer__anchor}`} href={`${config.github}/blob/develop/src/pages${page.slice(0, -1)}.md`}>
      <EditIcon style={{ fontSize: 20, position: `relative`, top: -2 }} />
      <span style={{ marginLeft: "0.5em" }}>edit this page</span>
    </a>
  </div>
)

EditThisPage.propTypes = {
  page: PropTypes.string.isRequired
}

const margin = {
  marginTop: 20
}

const Docs = ({ html }) => (
  <div className={styles.wrapper}>
    <div className={styles.sidebar}>
      <Sidebar style={margin} />
    </div>
    <div className={styles.wrapperDocs} >
      <article style={margin} dangerouslySetInnerHTML={{ __html: html }}></article>
    </div>
  </div>
)

Docs.propTypes = {
  html: PropTypes.string.isRequired
}

const About = ({ html }) => (
  <div className={styles.wrapperAbout} >
    <article dangerouslySetInnerHTML={{ __html: html }}></article>
  </div>
)

About.propTypes = {
  html: PropTypes.string.isRequired
}

const Page = ({ docs, html }) => (
  <div className={styles.position}>
    {
      docs ?
        <Docs html={html}/> :
        <About html={html}/>
    }
  </div>
)

Page.propTypes = {
  docs: PropTypes.bool.isRequired,
  html: PropTypes.string.isRequired
}

const Markdown = ({ data: { markdownRemark }, location }) => {
  const { html, frontmatter: { title }, fields: { slug } } = markdownRemark

  return (
    <Layout location={location}>
      <>
        <Helmet title={`${title} | ${config.siteTitle}`} />
        <SEO postPath={slug} postNode={markdownRemark} postSEO />
        <Page docs={slug.includes('documentation')} html={html} />
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
