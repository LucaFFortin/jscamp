import { useState } from "react"

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
                <h3>{titulo}</h3>
                <h4>{empresa} | {ubicacion}</h4>
                <p>{descripcion}</p>
            </div>
            <div>
                <button onClick={handleClick} className={isApplied ? "is-applied" : ""} disabled={isApplied} >{isApplied ? "Aplicado" : "Aplicar" }</button>
            </div>
        </article>
    )
}