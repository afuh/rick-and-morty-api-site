import { graphql } from "gatsby"

export const APIStatistics = graphql`
  fragment statistics on rmAPI {
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
`
