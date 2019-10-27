require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  
  createRedirect({ 
    fromPath: '/api/*', 
    toPath: `${process.env.API_URL}/api/:splat`, 
    statusCode: 200 
  })

  createRedirect({ 
    fromPath: '/graphql', 
    toPath: `${process.env.API_URL}/graphql`, 
    statusCode: 200 
  })

  return new Promise((resolve, reject) => {
    const component = path.resolve('src/templates/markdown.js')
    resolve(
      graphql(
        `
        {
          projects: allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.projects.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug,
            component,
            context: {
              slug: edge.node.fields.slug
            }
          })
        })
      })
    )
  })
}
