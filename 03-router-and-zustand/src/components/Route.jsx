import { useRouter } from "../hooks/useRouter"

export const Route = ({ path, component: Component}) => {
    const { currentPath } = useRouter()
    
    if (path !== currentPath) return null

    return <Component />
}