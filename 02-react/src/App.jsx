import { useState } from 'react'
// import { BriefCaseSVG, BuildingSVG, PeopleSVG } from './assets/SVGs'
import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { JobListings } from './components/JobListings.jsx'
import { JobsNavigation } from './components/JobsNavigation.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import jobsData from "./data.json"
import { NotFoundPage } from './pages/404.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
// import InfoArticle from './components/InfoArticle'

const RESULTS_PER_PAGE = 5

function App() {
  const [filters, setFilters] = useState({
    query: "",
    technologies: "",
    location: "",
    experience: "",
  })
  const [textToFilter, setTextToFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

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

  const handleTextFilter = (text) => {
    setTextToFilter(text)
    setCurrentPage(1)
  }

  const path = window.location.pathname

  let page = <NotFoundPage />
  if (path === "/") {
    page = <HomePage />
  } else if (path === "/search") {
    page = <SearchPage />
  }

  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  )
}

export default App
