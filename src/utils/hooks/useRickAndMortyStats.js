import { useStaticQuery, graphql } from 'gatsby'

export const useRickAndMortyStats = () => {
  const { stats } = useStaticQuery(
    graphql`
      query {
        stats: rickAndMortyAPI {
          characters: characters {
            info {
              count
            }
          }
          locations: locations {
            info {
              count
            }
          }
          episodes: episodes {
            info {
              count
            }
          }
        }
      }
    `,
  )

  return stats
}
