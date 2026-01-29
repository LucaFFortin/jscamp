const filtersContainer = document.querySelector("#filters")
import { filterValue } from "./form.js"

// estado de filtros
export let filters = {
    "location": "",
    "technology": "",
    "experience": ""
}

filtersContainer.addEventListener("change", e => {
    if (e.target.nodeName !== "SELECT") return

    let id = e.target?.id
    let modalidad = e.target?.value

    if (id === undefined || modalidad === undefined) {
        return
    }

    if (id === "technology-filter") filters["technology"] = modalidad
    if (id === "experience-filter") filters["experience"] = modalidad
    if (id === "location-filter") filters["location"] = modalidad

    setFilters()
})

function setFilters () {
    let jobs = document.querySelectorAll(".job-listing-card")

    jobs.forEach(job => {
        // form values
        let title = job.querySelector("h3").innerText.toLowerCase()
        let contractor = job.querySelector("h4").innerText.toLowerCase().replace(/ \|.*/g, "")

        let technologies = job.getAttribute("data-technology").split(",")
        let experience = job.getAttribute("data-experience")
        let location = job.getAttribute("data-location")

        let hasTechnology = false
        technologies.forEach(tech => {
            if (tech === filters["technology"] || filters["technology"] === "") hasTechnology = true
        })

        // validamos si el titulo o la empresa con el valor filtrado y tenemos en cuenta los filtros o si la entrada esta vacia teniendo en cuenta los filtros
        let isShown = (title.startsWith(filterValue) || contractor.startsWith(filterValue)) && (hasTechnology 
            && (filters["experience"] === experience || filters["experience"] === "")
            && (filters["location"] === location || filters["location"] === "")
            ) || (filterValue === "" && (hasTechnology 
            && (filters["experience"] === experience || filters["experience"] === "")
            && (filters["location"] === location || filters["location"] === "")))
        
            job.classList.toggle("is-hidden", !isShown)

    })
}