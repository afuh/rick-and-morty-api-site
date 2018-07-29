const config = require('./config/siteConfig')

module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sass`,
    {
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.siteTitle,
				short_name: config.siteTitleAlt,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: 'minimal-ui',
				icons: [
					{
						src: '/images/rm192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/images/rm512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		},
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-"
            }
          }
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
		}
  ]
}
