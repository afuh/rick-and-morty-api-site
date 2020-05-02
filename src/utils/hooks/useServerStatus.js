import { useEffect, useState } from 'react'

const url = `https://updown.io/api/checks/4jhq?api-key=${process.env.GATSBY_UPDOWN_TOKEN}`

export const useServerStatus = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url).then(r => r.json())
        setData(res)
      }
      catch (e) {
        console.log(e)
      }
      finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    loading
  }
}