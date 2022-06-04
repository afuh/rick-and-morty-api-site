require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions

  createRedirect({
    fromPath: '/api/*',
    toPath: `${process.env.REST_API_URL}/:splat`,
    statusCode: 200,
  })

  createRedirect({
    fromPath: '/graphql',
    toPath: `${process.env.GRAPHQL_API_URL}`,
    statusCode: 200,
  })

  createRedirect({
    fromPath: '/help-us',
    toPath: '/support-us',
    statusCode: 301,
  })
}
