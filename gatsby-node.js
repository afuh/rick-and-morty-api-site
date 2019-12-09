require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})


exports.createPages = ({ actions }) => {
  const { createRedirect } = actions

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
}