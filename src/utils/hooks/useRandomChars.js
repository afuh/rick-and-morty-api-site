import { useEffect, useState } from 'react'
import { getCharacter, getEpisode } from 'rickmortyapi'
import { useRickAndMortyStats } from './'

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

export const useRandomChars = ({ total }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { characters } = useRickAndMortyStats()

  const random = getRandomNums({
    max: characters.info.count,
    total,
  })

  const cache = 'rm-characters'

  useEffect(() => {
    if (sessionStorage.getItem(cache)) {
      setData(JSON.parse(sessionStorage.getItem(cache)))
      setLoading(false)
      return
    }

    const fetchFromAPI = async () => {
      const charRes = await getCharacter(random)
      const epiRes = await Promise.all(
        charRes.map(async ({ episode }) => {
          const [id] = episode[0].match(/[0-9]+/)
          const { name, url } = await getEpisode(Number(id))
          return { name, url }
        }),
      )

      // Only the first episode is needed.
      const character = charRes.map((char, i) => ({
        ...char,
        episode: epiRes[i],
      }))

      sessionStorage.setItem(cache, JSON.stringify(character))
      setData(character)
      setLoading(false)
    }

    fetchFromAPI()
  }, [])

  return {
    loading,
    data,
  }
}
