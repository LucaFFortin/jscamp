import { useRouter } from "../hooks/useRouter"

export const Link = ({ href, children, ...props}) => {
    // Cambiar a Navigate API

    const checkPath = () => {
        if (window.location.pathname === "/") return
        return href.includes(window.location.pathname)
    }

    const { navigateTo } = useRouter()
    
    const handleClick = e => {
        e.preventDefault()

        navigateTo(href)
    }
    
    return (
    <a href={href} aria-current={checkPath() ? "page" : ""} className={checkPath() ? "active-link" : ""} {...props} onClick={handleClick}>
        {children}
    </a>
    )
}