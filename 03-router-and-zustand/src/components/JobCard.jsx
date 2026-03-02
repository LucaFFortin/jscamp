import { useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'
import { useFavoritesStore } from "../store/favorites"
import { useAuthStore } from "../store/auth"

export const JobCard = ({ job }) => {

    const { data, descripcion, empresa, id, titulo, ubicacion } = job
    const { modalidad, nivel, technologies } = data

    return (
        <article className='job-listing-card' data-modalidad={modalidad} data-nivel={nivel} data-technologies={technologies?.join(", ")}>
            <div>
                <Link href={`/job/${id}`} className={styles.headerLink}>
                    <h3>{titulo}</h3>
                </Link>
                <h4>{empresa} | {ubicacion}</h4>
                <p>{descripcion}</p>
            </div>
            <div>
                <Link
                    href={`/job/${id}`}
                    aria-label={`Ver detalles de ${titulo} en ${empresa}`}
                >
                    Ver detalle
                </Link>
                <ApplyButton />
                <AddFavoriteButton jobId={job.id} />
            </div>
        </article>
    )
}

const ApplyButton = () => {
    const [isApplied, setIsApplied] = useState(false)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

    const handleClick = () => {
        if (isApplied) return
        setIsApplied(true)
    }

    return (
        <button 
            onClick={handleClick} 
            className={isApplied ? "is-applied" : ""} 
            disabled={isApplied || !isLoggedIn} 
        >
            {isApplied ? "Aplicado" : "Aplicar"}
        </button>
    )
}

const AddFavoriteButton = ({ jobId }) => {
    const { isFavorite, toggleFavorite } = useFavoritesStore()
    const { isLoggedIn } = useAuthStore()

    return (
        <button
            disabled={!isLoggedIn}
            onClick={() => toggleFavorite(jobId)}
            aria-label={isFavorite(jobId) ? "Remove from favorites" : "Add to Favorites"}
        >
            {isFavorite(jobId) ? "❤️" : "🤍"}
        </button>
    )
}