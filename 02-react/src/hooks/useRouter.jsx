import { useEffect, useState } from "react"

export const useRouter = (initialValue = window.location.pathname) => {
  const [currentPath, setCurrentPath] = useState(initialValue ?? window.location.pathname)

    useEffect(() => {
      const handlePathChange = () => {
        setCurrentPath(window.location.pathname)
      }
      
      window.addEventListener('popstate', handlePathChange)
  
      return () => {
        window.removeEventListener('popstate', handlePathChange)
      }
    }, [window.location.pathname])
  

  const navigateTo = (href) => {
    window.history.pushState({}, "", href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return {
    currentPath,
    navigateTo,
  }
}