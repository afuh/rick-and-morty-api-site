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

const MDXTemplate = ({ children: _children, pageContext: { frontmatter } }) => {
  const seo = {
    title: frontmatter.title,
    description: frontmatter.description,
    pathname: frontmatter.slug,
    image: frontmatter.cover,
  }

  const isDocs = frontmatter.slug.includes('documentation')

  //TODO: Frontmatter is being passed as children, which causes it to end up being rendered.
  // This started to happen from Gatsby v4 onwards.
  // eslint-disable-next-line no-unused-vars
  const [_removedFrontmatter, ...children] = _children

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
