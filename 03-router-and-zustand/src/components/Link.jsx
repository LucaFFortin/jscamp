import { Link as RRLink, useLocation } from "react-router"

export const Link = ({ href, children, ...props}) => {
    const location = useLocation()

    const checkPath = () => {
        if (location.pathname === "/") return
        return href.includes(location.pathname)
    }
    
    return (
    <RRLink to={href} aria-current={checkPath() ? "page" : ""} className={checkPath() ? "active-link" : ""} {...props}>
        {children}
    </RRLink>
    )
}