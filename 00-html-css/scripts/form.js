import { filters } from "./filters.js"

const formulario = document.querySelector("#search-form")

export let filterValue = ""

formulario.addEventListener("input", e => {
    if (e.target.nodeName !== "INPUT") return

    filterValue = e.target.value.toLowerCase()
    const jobs = document.querySelectorAll(".job-listing-card")

    jobs.forEach(job => {
        let title = job.querySelector("h3").innerText.toLowerCase()
        let contractor = job.querySelector("h4").innerText.toLowerCase().replace(/ \|.*/g, "")

        // options Values
        let technologies = job.getAttribute("data-technology").split(",")
        let experience = job.getAttribute("data-experience")
        let location = job.getAttribute("data-location")

        let hasTechnology = false

        technologies.forEach(tech => {
            if (tech === filters["technology"] || filters["technology"] === "") hasTechnology = true
        })


        // validamos si el titulo o la empresa con el valor filtrado y tenemos en cuenta los filtros o si la entrada esta vacia teniendo en cuenta los filtros
        
        let isShown = (title.startsWith(filterValue) || contractor.startsWith(filterValue) ) && (hasTechnology 
            && (filters["experience"] === experience || filters["experience"] === "")
            && (filters["location"] === location || filters["location"] === "")
            ) || (filterValue === "" && (hasTechnology 
            && (filters["experience"] === experience || filters["experience"] === "")
            && (filters["location"] === location || filters["location"] === "")))

        job.classList.toggle("is-hidden", !isShown)
    })
})

