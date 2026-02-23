import { useEffect, useRef, useState } from 'react'
import { JobListings } from '../components/JobListings.jsx'
import { JobsNavigation } from '../components/JobsNavigation.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import "../index.css"
import { useRouter } from '../hooks/useRouter.jsx'

// traer datos de una api, guardarlos en un estado
// crear un efecto para traer datos del exterior de manera asyncrona
// api https://jscamp-api.vercel.app/api/jobs

// las llamadas a apis van dentro de useEffect, estos pueden ser asincronos dentro de este

// para ejecutar los parametros de busqueda tenemos que usar URLSearchParams y luego pasarlo a string para añadirlo a la URL

const useFilters = ({ saveFilters, resetFilters, storedFilters }) => {
    const { navigateTo } = useRouter()
    const [filters, setFilters] = useState(() => {
        // TODO-FIX: add url syncronization in useLocalStorage
        if (storedFilters) return storedFilters
        const params = new URLSearchParams(window.location.search)

        let initialFilters = ({
            query: params.get("text") || "",
            technologies: params.get("technology") || "",
            location: params.get("type") || "",
            experience: params.get("level") || "",
        })

        return initialFilters
    })
    const [currentPage, setCurrentPage] = useState(() => {
        const params = new URLSearchParams(window.location.search)

        let page = Number.parseInt(params.get("page"))

        return Number.isNaN(page) ? 1 : page
    })


    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const hasActiveFilters = Boolean(filters.experience || filters.location || filters.query || filters.technologies)

    const handleClearFilters = () => {
        setFilters({
            query: "",
            technologies: "",
            location: "",
            experience: "",
        })
        setCurrentPage(1)
        resetFilters()
    }

    const RESULTS_PER_PAGE = 5

    // TODO-FIX: Reinicia el page del URL y hace que no se refleje correctamente
    useEffect(() => {
        setCurrentPage(1)
    }, [filters.experience, filters.location, filters.query, filters.technologies])

    useEffect(() => {
        async function getJobs() {
            try {
                setError(null)
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

                if (!response.ok) {
                    setError(error.status)
                    throw new Error("Error on API response, status:", response.status)
                }

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
    }, [filters, currentPage])

    useEffect(() => {
        let searchParams = new URLSearchParams()

        if (filters.experience) searchParams.append('level', filters.experience)
        if (filters.location) searchParams.append('type', filters.location)
        if (filters.technologies) searchParams.append('technology', filters.technologies)
        if (filters.query) searchParams.append('text', filters.query)

        if (currentPage > 1) searchParams.append('page', currentPage)

        const url = searchParams.toString()
            ? `${window.location.pathname}?${searchParams.toString()}`
            : window.location.pathname

        navigateTo(url)

    }, [filters, currentPage, navigateTo])

    useEffect(() => {
        saveFilters(filters)
    }, [filters])

    const totalPages = Math.ceil(total / RESULTS_PER_PAGE)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    return { jobs, loading, totalPages, total, currentPage, filters, hasActiveFilters, error, handleSearch, handlePageChange, handleClearFilters }
}

const useLocalStorage = () => {
    let storedFilters = ""
    const SearchPageID = "SearchPageFilters"

    const getFilters = () => {
        try {
            let filters = JSON.parse(localStorage.getItem(SearchPageID)) || null
            return filters
        } catch (error) {
            console.log("Error:", error)
            return null
        }
    }

    // lazy initialization, para obtener un valor solo la primera vez que el componente se monte
    // useState(() => {
    //     storedFilters = getFilters()
    // })

    const saveFilters = (filters) => {
        localStorage.setItem(SearchPageID, JSON.stringify(filters))
    }

    const resetFilters = () => {
        localStorage.removeItem(SearchPageID)
    }

    return {
        storedFilters,
        saveFilters,
        getFilters,
        resetFilters,
    }
}

export function SearchPage() {
    const { saveFilters, storedFilters, resetFilters } = useLocalStorage()
    const {
        jobs,
        loading,
        totalPages,
        currentPage,
        hasActiveFilters,
        error,
        filters,
        handlePageChange,
        handleClearFilters,
        handleSearch,
    } = useFilters({ saveFilters, resetFilters, storedFilters })

    return (
        <main>
            <SearchFormSection
                onSearch={handleSearch}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
                initialFilters={filters}
            />
            <section className="job-listings">
                {error && (
                    <>
                        <h4>Error: {error}</h4>
                        <button onClick={() => window.location.reload()}>Recargar pagina</button>
                    </>
                )}
                {loading
                    ? <h4>Cargando Trabajos...</h4>
                    : <JobListings jobList={jobs} />
                }
                <JobsNavigation
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </section>
        </main>
    )
}