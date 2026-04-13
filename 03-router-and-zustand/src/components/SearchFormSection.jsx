import { useId, useRef } from "react"

const useSearchForm = ({ idQuery, idTechnology, idLocation, idExperience, onSearch }) => {
  const timeoutID = useRef(null)

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === idQuery) name = "query"
    if (name === idTechnology) name = "technologies"
    if (name === idLocation) name = "location"
    if (name === idExperience) name = "experience"
    onSearch(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = new FormData(e.currentTarget)

    let filters = {
      query: formData.get(idQuery),
      technologies: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    }

    // aplicamos debounce si la entrada de datos proviene del input para evitar multiples llamadas
    if (e.target.name === idQuery) {
      // Debounce: tecnica para retrasar las llamadas a una funcion
      // si existe el timer, lo eliminamos y creamos uno nuevo
      if (timeoutID.current) clearTimeout(timeoutID.current)

      // solo si pasa el tiempo sin crear un nuevo timer se ejecuta
      timeoutID.current = setTimeout(() => {
        onSearch(filters)
      }, 500)
    } else {
      onSearch(filters)
    }
  }


  return {
    handleSubmit,
    handleChange,
  }
}

export function SearchFormSection({ onSearch, onClearFilters, hasActiveFilters, initialFilters }) {
  const idQuery = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperience = useId()
  const { handleSubmit, handleChange } = useSearchForm({ idQuery, idTechnology, idLocation, idExperience, onSearch })


  return (
    <section className="form-section">
      <h1>Encuentra tu proximo empleo</h1>

      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form role="search" id="search-form" onChange={handleSubmit}>
        <fieldset>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            type="text"
            placeholder="Buscar trabajos, empresas o habilidades"
            name={idQuery}
            id={idQuery}
            value={initialFilters.query}
            onChange={handleChange}
          />

        </fieldset>
        <fieldset id="filters">
          <select
            name={idTechnology}
            id={idTechnology}
            value={initialFilters.technologies}
            onChange={handleChange}
          >
            <option value="">Tecnológia</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cplusplus">C++</option>
          </select>

          <select
            name={idLocation}
            id={idLocation}
            value={initialFilters.location}
            onChange={handleChange}
          >
            <option value="">Ubicación</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="barcelona">Barcelona</option>
            <option value="madrid">Madrid</option>
            <option value="monterrey">Monterrey</option>
            <option value="lima">Lima</option>
            <option value="santiago">Santiago de Chile</option>
            <option value="bsas">Buenos Aires</option>
            <option value="bogota">Bogotá</option>
            <option value="remoto">Remoto</option>
          </select>

          <select
            name={idExperience}
            id={idExperience}
            value={initialFilters.experience}
            onChange={handleChange}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid-level">SemiSenior</option>
            <option value="senior">Senior</option>
          </select>

          {hasActiveFilters && <button onClick={onClearFilters} type="reset">Limpiar Filtros</button>}
        </fieldset>

      </form>
    </section>
  )
}
