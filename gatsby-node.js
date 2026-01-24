require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions

  createRedirect({
    fromPath: '/api/*',
    toPath: `${process.env.REST_API_URL}/:splat`,
    statusCode: 308,
  })

  createRedirect({
    fromPath: '/graphql',
    toPath: `${process.env.GRAPHQL_API_URL}`,
    statusCode: 308,
  })
}
