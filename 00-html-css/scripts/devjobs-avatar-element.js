class DevJobsAvatar extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })
    }

    createURL(user, service) {
        return `https://unavatar.io/${service}/${user}`
    }

    render() {
        // recuperamos los atributos
        const service = this.getAttribute("service") ?? "github"
        const user = this.getAttribute("user") ?? "mdo"
        const size = this.getAttribute("size") ?? "48"
        const url = this.createURL(user, service)

        // this.innerHTML cuando no esta activo el ShadowDOM
        this.shadowRoot.innerHTML = `
            <style>
                a {
                    display: flex;
                    aling-items: center;
                }
                img {
                    border-radius: 50%;
                    width: ${size}px;
                    height: ${size}px;
                }
            </style>
            <a href="#">
                <img src="${url}"
                alt="avatar de ${user}" 
                width="64px"
                class="avatar"/>
            </a>
        `
    }

    connectedCallback() {
        this.render()
    }
}

customElements.define("devjobs-avatar", DevJobsAvatar)