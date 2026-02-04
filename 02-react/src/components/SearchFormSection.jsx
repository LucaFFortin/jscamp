import { useId } from "react"

export function SearchFormSection({ onSearch, onTextFilter }) {
  const idQuery = useId()
  const idTechnology = useId()
  const idLocation = useId()
  const idExperience = useId()

  const handleSubmit = (e) => {
    e.preventDefault()

    let formData = new FormData(e.currentTarget) 

    let filters = {
      query: formData.get(idQuery),
      technologies: formData.get(idTechnology),
      location: formData.get(idLocation),
      experience: formData.get(idExperience),
    }
    
    onSearch(filters)
  }

  // const handleTextChange = (e) => {
  //   let text = e.target.value

  //   onTextFilter(text)
  // }

  // const handleFilterChange = event => {
  //   let target = event.target
    
  //   let newFilters = {
  //     query: target.id === idQuery ? target.value : filters.query,
  //     technologies: target.id === idTechnology ? target.value : filters.technologies,
  //     location: target.id === idLocation ? target.value : filters.location,
  //     experience: target.id === idExperience ? target.value : filters.experience,
  //   }
    
  //   onSearch(newFilters)
  // }

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
            // onChange={handleFilterChange}
          />

        </fieldset>
        <fieldset id="filters">
          <select name={idTechnology} id={idTechnology} >
            <option value="">Tecnológia</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="cplusplus">C++</option>
          </select>

          <select name={idLocation} id={idLocation} >
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

          <select name={idExperience} id={idExperience} >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid-level">SemiSenior</option>
            <option value="senior">Senior</option>
          </select>
        </fieldset>
      </form>
    </section>
  )
}
