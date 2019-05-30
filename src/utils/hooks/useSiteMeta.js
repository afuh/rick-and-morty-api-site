import { useStaticQuery, graphql } from 'gatsby'

export const useSiteMeta = () => {
  const { site: { siteMetadata } } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            shortTitle
            description
            subDescription
            siteUrl
            image
            userTwitter
            nav {
              title
              path
            }
            github {
              site
              api
            }
            author {
              name
              site
            }
          }
        }
      }
    `
  )

  return siteMetadata
}
