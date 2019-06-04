import { useEffect, useState } from 'react'
import { getCharacter } from 'rickmortyapi'
import { useRickAndMortyStats } from './'

const getRandomNums = ({ max, total }) => {
  const arr = []
  const randomNum = () => Math.floor(Math.random() * max + 1)

  if (total === 1) {
    return randomNum()
  }

  while (arr.length < total) {
    const num = randomNum()
    if (arr.indexOf(num) > - 1) {
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
    total
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacter(random)
      setData(data)
      setLoading(false)
    }

    fetchData()
  }, []) // eslint-disable-line

  return {
    loading,
    data
  }
}
