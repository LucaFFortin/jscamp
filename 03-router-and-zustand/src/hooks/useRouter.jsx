import { useLocation, useNavigate } from "react-router"

export const useRouter = (initialValue = window.location.pathname) => {
  const location = useLocation()
  const navigate = useNavigate()

  const navigateTo = (href) => {
    navigate(href)
  }
  
  const currentPath = initialValue ?? location.pathname

  return {
    currentPath,
    navigateTo,
  }
}