const jobListings = document.querySelector(".job-listings-container")

fetch("../jobs-data/data.json")
    .then(res => res.json())
    .then(jobs => {
        console.log(jobs)

        jobs.forEach(job => {
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
)
