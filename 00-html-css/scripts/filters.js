const filtersContainer = document.querySelector("#filters")

// estado de filtros
let filters = {
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
    let isShown = false
    let hasTechnology = false

    jobs.forEach(job => {
        let technologies = job.getAttribute("data-technology").split(",")
        let experience = job.getAttribute("data-experience")
        let location = job.getAttribute("data-location")

        technologies.forEach(tech => {
            if (tech === filters["technology"] || filters["technology"] === "") hasTechnology = true
        })

        if (hasTechnology 
            && (filters["experience"] === experience || filters["experience"] === "")
            && (filters["location"] === location || filters["location"] === "")
            ) isShown = true

        job.classList.toggle("is-hidden", !isShown)

        isShown = false
        hasTechnology = false
    })
}