import { graphql } from "gatsby"

export const APIStatistics = graphql`
  fragment statistics on rmAPI {
    characters: allCharacters {
      info {
        count
      }
    }
    locations: allLocations {
      info {
        count
      }
    }
    episodes: allEpisodes {
      info {
        count
      }
    }
  }
`
