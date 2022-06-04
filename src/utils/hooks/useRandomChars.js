import { useEffect, useState } from 'react'

import { useSiteMeta } from './useSiteMeta'
import { useRickAndMortyStats } from './'

const CACHE_KEY = 'rm-characters'

const getRandomNums = ({ max, total }) => {
  const arr = []
  const randomNum = () => Math.floor(Math.random() * max + 1)

  if (total === 1) {
    return randomNum()
  }

  while (arr.length < total) {
    const num = randomNum()
    if (arr.indexOf(num) > -1) {
      continue
    }
    arr[arr.length] = num
  }

  return arr
}

const graphqlQuery = (ids) => ({
  query: `
    query randomCharacters($ids: [ID!]!) {
      charactersByIds(ids: $ids) {
        id
        name
        status
        species
        image
        episode {
          name
          id
        }
        location {
          name
          id
        }
      }
    }
  `,
  variables: { ids },
})

export const useRandomCharacters = ({ total }) => {
  const { siteUrl } = useSiteMeta()
  const {
    characters: { info },
  } = useRickAndMortyStats()

  const [randomCharacters, setRandomCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFromAPI = async () => {
    const res = await fetch(`${siteUrl}/graphql`, {
      method: 'POST',
      body: JSON.stringify(graphqlQuery(getRandomNums({ max: info.count, total }))),
      headers: {
        'content-type': 'application/json',
      },
    }).catch(() => {
      setLoading(false)
    })

    if (res && res.ok) {
      const { data } = await res.json()

      const characters = data.charactersByIds.map((item) => ({
        ...item,
        url: `${siteUrl}/api/character/${item.id}`,
        episode: {
          name: item.episode[0].name,
          url: `${siteUrl}/api/episode/${item.episode[0].id}`,
        },
        location: {
          name: item.location.name,
          url: `${siteUrl}/api/location/${item.location.id}`,
        },
      }))

      setRandomCharacters(characters)
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(characters))
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem(CACHE_KEY)) {
      setRandomCharacters(JSON.parse(sessionStorage.getItem(CACHE_KEY)))
      setLoading(false)
      return
    }

    fetchFromAPI()
    setLoading(false)
  }, [])

  return {
    loading,
    data: randomCharacters,
  }
}
