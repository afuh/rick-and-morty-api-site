import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Layout from './'
import { prismCSS } from '../../styles'
import Docs from '../docs'
import EditThisPage from '../editThisPage'

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  font-variant-ligatures: none;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  text-decoration-skip-ink: auto;

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
      <>
        <Content prism={!!isDocs}>
          {isDocs ?
            <Docs>{children}</Docs>:
            <div>{children}</div>
          }
        </Content>
        <EditThisPage page={frontmatter.slug} />
      </>
    </Layout>
  )
}

MDXTemplate.propTypes = {
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.object
  }).isRequired
}

export default MDXTemplate
