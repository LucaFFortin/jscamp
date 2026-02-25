import { useParams } from "react-router"
import "./detail.css"
import { useEffect, useState } from "react"
import { Link } from "../components/Link.jsx"
import { useRouter } from "../hooks/useRouter.jsx"
import snarkdown from 'snarkdown';

const SVGCheck = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="#0099ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-circle-check">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M9 12l2 2l4 -4" />
    </svg>
  )
}

export const JobSection = ({ title, content, className }) => {
  const html = snarkdown(content)

  if (title === "Responsabilidades" || title === "Requisitos") {

    const regex = /<li\b[^>]*>(.*?)<\/li>/gis
    const matches = [...html.matchAll(regex)]
    const contenidos = matches.map(m => m[1].trim())

    return (
      <section className={className}>
        <h2>{title}</h2>
        <ul>
          {contenidos.map((contenido, index) => {
            return (
              <li key={index}><SVGCheck />{contenido}</li>
            )
          })}
        </ul>
      </section>
    )
  }

  return (
    <section className={className}>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  )
}

export default function Detail() {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { jobId } = useParams()
  const { navigateTo } = useRouter()

  useEffect(() => {
    if (!jobId) return

    const controller = new AbortController()

    async function fetchJob(jobId) {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`, {
          signal: controller.signal
        })

        if (!response.ok) throw new Error("Error respuesta de API:", response.body)

        const data = await response.json()
        setJob(data)

      } catch (error) {
        if (error.name === "AbortError") return
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob(jobId)

    return () => {
      controller.abort()
    }
  }, [jobId])

  if (loading) return (
    <>
      <h2>Cargando...</h2>
    </>
  )

  if (error || !job) return (
    <>
      <h2>Empleo no encontrado.</h2>
      <Link href={"/"}>
        Volver a la Pagina Principal.
      </Link>
      <button onClick={() => navigateTo(-1)}>Volver atras</button>
    </>
  )

  return (
    <main>
      <div className="ubication">
        <span><Link href={"/search"}>Empleos</Link> <span className="divisor">/</span></span> {job.titulo}
      </div>
      <article className="job">
        <header className="job-title">
          <section>
            <h1>{job.titulo}</h1>
            <p>{job.empresa} - {job.ubicacion}</p>
          </section>
          <section>
            <button>Aplicar ahora</button>
          </section>
        </header>
        <footer className="job-description">
          <JobSection title="Descripción del puesto" content={job.content.description} className="description" />
          <JobSection title="Responsabilidades" content={job.content.responsibilities} className="responsabilities" />
          <JobSection title="Requisitos" content={job.content.requirements} className="requisites" />
          <JobSection title="Acerca de la empresa" content={job.content.about} className="about" />
        </footer>
      </article>
    </main>
  )
}