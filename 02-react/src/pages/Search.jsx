import { useEffect, useState } from 'react'
import { JobListings } from '../components/JobListings.jsx'
import { JobsNavigation } from '../components/JobsNavigation.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import "../index.css"

// traer datos de una api, guardarlos en un estado
// crear un efecto para traer datos del exterior de manera asyncrona
// api https://jscamp-api.vercel.app/api/jobs

// las llamadas a apis van dentro de useEffect, estos pueden ser asincronos dentro de este

// para ejecutar los parametros de busqueda tenemos que usar URLSearchParams y luego pasarlo a string para añadirlo a la URL

const useFilters = () => {
    const [filters, setFilters] = useState({
        query: "",
        technologies: "",
        location: "",
        experience: "",
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

    const RESULTS_PER_PAGE = 5

    useEffect(() => {
        const path = window.location.search 
        
        let initialQuery = path ? path.split('&')[0].split('=')[1] : ""
        
        if (initialQuery) setFilters({...filters, query: initialQuery})
    }, [])

    
    useEffect(() => {
        setCurrentPage(1)
    }, [filters.experience, filters.location, filters.query, filters.technologies])

    useEffect(() => {
        async function getJobs() {
            try {

                let queryParams = new URLSearchParams()
                if (filters.experience) queryParams.append('level', filters.experience)
                if (filters.location) queryParams.append('type', filters.location)
                if (filters.technologies) queryParams.append('technology', filters.technologies)
                if (filters.query) queryParams.append('text', filters.query)

                queryParams.append('limit', RESULTS_PER_PAGE)
                let offset = (currentPage - 1) * RESULTS_PER_PAGE
                queryParams.append('offset', offset)

                let query = queryParams.toString()

                let response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${query}`)
                let json = await response.json()

                setJobs(json.data)
                setTotal(json.total)
            } catch (erorr) {
                console.log("Error:", erorr);
            } finally {
                setLoading(false)
            }
        }

        getJobs()
    }, [filters.experience, filters.location, filters.query, filters.technologies, currentPage])
    
    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    return {handleSearch, handlePageChange, jobs, loading, totalPages, total,currentPage }
}

export function SearchPage() {
    const {handleSearch, jobs, loading, totalPages, currentPage, handlePageChange} = useFilters()

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} />
            <section className="job-listings">
                {loading 
                    ? <h4>Cargando Trabajos</h4>
                    : <JobListings jobList={jobs} />
                }
                <JobsNavigation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </section>
        </main>
    )
}

    // Con Submit
    // const jobsFiltered = (filters.query === "" && filters.technologies === "" && filters.location === "" && filters.experience === "")
    //   ? jobsData
    //   : jobsData.filter(job => {
    //     const { titulo, data } = job
    //     const { modalidad, nivel, technology } = data

    //     let hasTitle = titulo.toLowerCase().includes(filters.query.toLowerCase()) || filters.query === ""
    //     let hasLocation = modalidad === filters.location || filters.location === ""
    //     let hasExperience = nivel === filters.experience || filters.experience === ""
    //     let hasTechnologies = (typeof technology === "object" ? technology.includes(filters.technologies) : technology === filters.technologies) || filters.technologies === ""

    //     return hasLocation && hasExperience && hasTechnologies && hasTitle
    //   })

    // const totalPages = Math.ceil(jobsFiltered.length / RESULTS_PER_PAGE)
    // const lastIndex = currentPage * RESULTS_PER_PAGE
    // const firstIndex = lastIndex - RESULTS_PER_PAGE
    // let currentJobs = jobsFiltered.slice(firstIndex, lastIndex)

    // const jobsWithTextFilter = textToFilter === ""
    //   ? jobsData
    //   : jobsData.filter(job => {
    //     return job.titulo.toLowerCase().includes(textToFilter.toLowerCase()) 
    //   })

