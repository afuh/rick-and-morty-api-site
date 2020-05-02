import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Layout from './'
import { prismCSS } from '../../styles/global'
import Docs from '../docs'
import EditThisPage from './editThisPage'
import { Article } from '../shared'

const MarkdownWrapper = styled.div`
  li {
    list-style-type: initial;
  }

  ${p => p.prism && prismCSS}
`

const MDXTemplate = ({ children, pageContext: { frontmatter } }) => {
  const seo = {
    title: frontmatter.title,
    description: frontmatter.description,
    pathname: frontmatter.slug,
    image: frontmatter.cover
  }

  const isDocs = frontmatter.slug.includes('documentation')

  return (
    <Layout seo={{ ...seo }}>
      <MarkdownWrapper prism={!!isDocs}>
        {isDocs ?
          <Docs>{children}</Docs>:
          <Article>{children}</Article>
        }
        <EditThisPage page={frontmatter.slug} />
      </MarkdownWrapper>
    </Layout>
  )
}

MDXTemplate.propTypes = {
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.object
  }).isRequired
}

export default MDXTemplate
