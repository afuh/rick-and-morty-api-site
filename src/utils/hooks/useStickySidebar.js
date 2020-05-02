import { useEffect, useState } from 'react'

export const useStickySidebar = () => {
  const [bottom, setBottom] = useState(0)

  useEffect(() => {
    const footer = document.querySelector('footer')

    const handleScroll = () => {
      const viewBottom = window.scrollY + window.innerHeight

      if (viewBottom >= footer.offsetTop){
        setBottom(viewBottom - footer.offsetTop)
      } else {
        setBottom(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return bottom
}
