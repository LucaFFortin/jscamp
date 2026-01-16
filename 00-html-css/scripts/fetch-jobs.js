const jobListings = document.querySelector(".job-listings-container")
const paginationElement = document.querySelector(".pagination")

const RESULS_PER_PAGE = 3

export async function getJobs() {
    let res = await fetch("../jobs-data/data.json")
    let jobs = await res.json()
    return jobs
}

let jobs = await getJobs()
let activePage = 0

paginationElement.addEventListener("click", e => {
    let element = e.target
    if (element.nodeName === "A") {
        if (element.classList.contains("prev-page") && activePage > 0) {
            activePage--
            let end = (activePage * RESULS_PER_PAGE) + RESULS_PER_PAGE
            renderJobs(activePage * RESULS_PER_PAGE, end)
            let prevPage =  paginationElement.querySelector(".active-page") 
            prevPage.classList.remove("active-page")
            prevPage.previousElementSibling.classList.add("active-page")
        }

        if (element.classList.contains("next-page") && activePage < 4) {
            activePage++
            let end = (activePage * RESULS_PER_PAGE) + RESULS_PER_PAGE
            renderJobs(activePage * RESULS_PER_PAGE, end)
            let nextPage =  paginationElement.querySelector(".active-page") 
            nextPage.classList.remove("active-page")
            nextPage.nextElementSibling.classList.add("active-page")
        }
    }

    if (element.nodeName !== "A" || !element.classList.contains("page")) return

    activePage = (parseInt(element.innerText) - 1)
    let end = (activePage * RESULS_PER_PAGE) + RESULS_PER_PAGE
    renderJobs(activePage * RESULS_PER_PAGE, end)

    paginationElement.querySelector(".active-page").classList.remove("active-page")
    element.classList.add("active-page")

})

function createPagination() {
    const PREV_PAGE_SVG = document.createElement("a")
    PREV_PAGE_SVG.classList.add("prev-page")
    PREV_PAGE_SVG.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 6l-6 6l6 6" />
              </svg>`

    const NEXT_PAGE_SVG = document.createElement("a")
    NEXT_PAGE_SVG.classList.add("next-page")
    NEXT_PAGE_SVG.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 6l6 6l-6 6" />
              </svg>`

    const TOTAL_PAGES = Math.ceil(jobs.length / RESULS_PER_PAGE)

    paginationElement.appendChild(PREV_PAGE_SVG)


    for (let i = 1; i <= TOTAL_PAGES; i++) {
        const page = document.createElement('a')
        if (i === 1) page.classList.add("active-page")
        page.classList.add("page")
        page.textContent = i
        page.setAttribute("data-position", i)
        paginationElement.appendChild(page)
    }

    paginationElement.appendChild(NEXT_PAGE_SVG)
}

createPagination()

function renderJobs(start = 0, end = 3) {
    jobListings.innerHTML = ""

    let jobsToRender = jobs.slice(start, end)
    jobsToRender.forEach(job => {
        let article = document.createElement("article")
        article.classList.add("job-listing-card")
        article.id = job.id
        article.setAttribute("data-location", job.data.modalidad)

        if (Array.isArray(job.data.technology)) {
            let technologies = job.data.technology.join(",")
            article.setAttribute("data-technology", technologies)
        } else {
            article.setAttribute("data-technology", job.data.technology)
        }

        article.setAttribute("data-experience", job.data.nivel)

        article.innerHTML = `
                <div>
                    <h3>${job.titulo}</h3>
                    <h4>${job.empresa} | ${job.ubicacion}</h4>
                    <p>${job.descripcion}</p>
                </div>
                <div>
                    <button>Aplicar</button>
                </div>`

        jobListings.appendChild(article)
    });
}

renderJobs()

// Con fetch
// fetch("../jobs-data/data.json")
//     .then(res => res.json())
//     .then(jobs => {
//         console.log(jobs)

//         jobs.forEach(job => {
//             let article = document.createElement("article")
//             article.classList.add("job-listing-card")
//             article.id = job.id
//             article.setAttribute("data-location", job.data.modalidad)

//             if (Array.isArray(job.data.technology)) {
//                 let technologies = job.data.technology.join(",")
//                 article.setAttribute("data-technology", technologies)
//             } else {
//                 article.setAttribute("data-technology", job.data.technology)
//             }

//             article.setAttribute("data-experience", job.data.nivel)

//             article.innerHTML = `
//             <div>
//                 <h3>${job.titulo}</h3>
//                 <h4>${job.empresa} | ${job.ubicacion}</h4>
//                 <p>${job.descripcion}</p>
//             </div>
//             <div>
//                 <button>Aplicar</button>
//             </div>`
//             jobListings.appendChild(article)
//         });
//     }
//     )
