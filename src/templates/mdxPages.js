import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Layout from '../components/layout'
import Docs from '../components/docs'
import EditThisPage from '../components/layout/editThisPage'
import { Article } from '../components/shared'

import '../styles/prism-theme.css'

const MarkdownWrapper = styled.div`
  li {
    list-style-type: initial;
  }
`

const MDXTemplate = ({ children, pageContext: { frontmatter } }) => {
  const seo = {
    title: frontmatter.title,
    description: frontmatter.description,
    pathname: frontmatter.slug,
    image: frontmatter.cover,
  }

  const isDocs = frontmatter.slug.includes('documentation')

  return (
    <Layout seo={{ ...seo }}>
      <MarkdownWrapper>
        {isDocs ? <Docs>{children}</Docs> : <Article>{children}</Article>}
        <EditThisPage pathToGithub={frontmatter.github} />
      </MarkdownWrapper>
    </Layout>
  )
}

MDXTemplate.propTypes = {
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.object,
  }).isRequired,
}

export default MDXTemplate
