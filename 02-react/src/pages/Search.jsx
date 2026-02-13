import { useEffect, useState } from 'react'
import { JobListings } from '../components/JobListings.jsx'
import { JobsNavigation } from '../components/JobsNavigation.jsx'
import { SearchFormSection } from '../components/SearchFormSection.jsx'
import jobsData from "../data.json"
import "../index.css"

export function SearchPage() {
    const [filters, setFilters] = useState({
        query: "",
        technologies: "",
        location: "",
        experience: "",
    })
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const path = window.location.search
        
        let initialQuery = path ? path.split('&')[0].split('=')[1] : ""
        
        if (initialQuery) setFilters({...filters, query: initialQuery})
    }, [])
    
    const RESULTS_PER_PAGE = 5

    const jobsFiltered = (filters.query === "" && filters.technologies === "" && filters.location === "" && filters.experience === "")
        ? jobsData
        : jobsData.filter(job => {
            const { titulo, data } = job
            const { modalidad, nivel, technology } = data

            let hasTitle = titulo.toLowerCase().includes(filters.query.toLowerCase()) || filters.query === ""
            let hasLocation = modalidad === filters.location || filters.location === ""
            let hasExperience = nivel === filters.experience || filters.experience === ""
            let hasTechnologies = (typeof technology === "object" ? technology.includes(filters.technologies) : technology === filters.technologies) || filters.technologies === ""

            return hasLocation && hasExperience && hasTechnologies && hasTitle
        })

    const totalPages = Math.ceil(jobsFiltered.length / RESULTS_PER_PAGE)
    const lastIndex = currentPage * RESULTS_PER_PAGE
    const firstIndex = lastIndex - RESULTS_PER_PAGE
    let currentJobs = jobsFiltered.slice(firstIndex, lastIndex)

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    return (
        <main>
            <SearchFormSection onSearch={handleSearch} />
            <section className="job-listings">
                <JobListings jobList={currentJobs} />
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

