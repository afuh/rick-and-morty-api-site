require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

const config = require('./config/siteConfig')

module.exports = {
  siteMetadata: {
    ...config
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "rmAPI",
        fieldName: "rickAndMortyAPI",
        url: "https://rickandmortyapi.com/graphql"
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortTitle,
        description: config.description,
        start_url: "/",
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/assets/rm512.png'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
        showSpinner: false
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA,
        anonymize: true,
        respectDNT: true
      }
    }
  ]
}
