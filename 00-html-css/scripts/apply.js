const listingContainer = document.querySelector(".job-listings")

listingContainer.addEventListener("click", e => {

    if (e.target.nodeName === "BUTTON") {
        let button = e.target
        console.log(button)
        if (!button.classList.contains("is-applied")) {
            button.classList.add("is-applied")
            console.log(button.classList.contains("is-applied"))
            button.textContent = "Aplicado"
        }
    }
})