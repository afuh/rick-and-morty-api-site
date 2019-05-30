import { useEffect, useState } from 'react'

export const useSidebar = () => {
  const [ top ] = useState(20)
  const [bottom, setBottom] = useState(0)
  const [fixed, setFixed] = useState(false)

  useEffect(() => {
    const header = document.querySelector("header")
    const footer = document.querySelector("footer")
    const editPage = document.querySelector("[id=edit-wrapper]")

    const handleScroll = () => {
      const viewBottom = window.scrollY + window.innerHeight
      const { offsetTop } = footer
      const { offsetHeight } = editPage

      if (window.scrollY >= header.offsetHeight) {
        setFixed(true)
      } else {
        setFixed(false)
      }

      if (viewBottom >= (offsetTop - offsetHeight)){
        const bottom = viewBottom - (offsetTop - offsetHeight - top)
        setBottom(bottom)
      }
      else {
        setBottom(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // eslint-disable-line

  return { fixed, bottom, top }
}
