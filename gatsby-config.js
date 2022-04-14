require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config = require('./config/siteConfig')

module.exports = {
  flags: {
    FAST_REFRESH: true,
  },
  siteMetadata: {
    ...config,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'rmAPI',
        fieldName: 'rickAndMortyAPI',
        url: 'https://rickandmortyapi.com/graphql',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.title,
        short_name: config.shortTitle,
        description: config.description,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: 'src/assets/rm512.png',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/templates/mdxPages.js'),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
            },
          },
          'gatsby-remark-external-links',
          'gatsby-remark-prismjs',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor,
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA,
        anonymize: true,
        respectDNT: true,
      },
    },
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify',
  ],
}
