import React from 'react'
import MDXTemplate from '../templates/mdxPages'

export const wrapPageElement = ({ element, props }) => {
  if (!props.pageContext?.frontmatter) {
    return element
  }

  return <MDXTemplate pageContext={props.pageContext}>{element}</MDXTemplate>
}
