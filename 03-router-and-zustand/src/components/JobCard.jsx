import { useState } from "react"
import { Link } from "./Link"
import styles from './JobCard.module.css'

export const JobCard = ({ job }) => {

    const [isApplied, setIsApplied] = useState(false)

    const handleClick = () => {
        if (isApplied) return
        setIsApplied(true)
    }

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
                <button onClick={handleClick} className={isApplied ? "is-applied" : ""} disabled={isApplied} >{isApplied ? "Aplicado" : "Aplicar" }</button>
            </div>
        </article>
    )
}