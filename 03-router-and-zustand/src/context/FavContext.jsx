import { createContext, useContext } from "react";

const FavoritesContext = createContext()

export function FavoritesProvider ({children}) {
    const [favorites, setFavorites] = useState([])

    // add, remove y is
    const addFavorite = (job) => {
        setFavorites(prevFav => [...prevFav, job])
    }

    const removeFavorites = (jobId) => {
        setFavorites(prevFav => {
            prevFav.filter(favorites => favorites.id !== jobId)
        })
    }

    const isFavorite = (jobId) => {
        return favorites.some(job => job.id === jobId)
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorites,
        isFavorite
    }
    
    return (
        <FavoritesContext value={value}>
            {children}
        </FavoritesContext>
    )
} 

export function useFavorites () {
    const context = useContext(FavoritesContext)

    if (context === undefined) throw new Error("Favorites must be used between FavoritesProvider")

    return context
}