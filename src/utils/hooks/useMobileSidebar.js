import { useEffect, useState } from 'react'

export const useMobileSidebar = (navRef) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeSidebar = () => setIsOpen(false)

  useEffect(() => {
    const anchors = navRef.current.querySelectorAll('a')

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', closeSidebar)
    })

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', closeSidebar)
      })
    }
  }, [navRef])

  return { isOpen, setIsOpen }
}
