import { InfoArticle } from "../components/InfoArticle"
import { BriefCaseSVG, PeopleSVG, BuildingSVG } from "../assets/SVGs"
import "./home.css"

export function HomePage() {
  return (
    <main className="homepage-main">
      <section className="background-image">
        <img src="/images/background.webp" alt="Desarrolladores trabajando juntos" width="800px" />

        <h1>Encuentra el trabajo de tus sueños</h1>

        <p>Unete a la comunidad mas grande de programadores y encuentra tu proxima oportunidad.</p>

        <form role="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input type="text" required placeholder="Buscar empleos por titulo, habilidad o empresa" />

          <button type="submit">Buscar</button>
        </form>
      </section>

      <section>
        <header>
          <h2>¿Porque DevJobs?</h2>
          <p>DevJobs es la principal bolsa de trabajo para desarrolladores. Conectamos a los desarrolladores con las
            mejores empresas del mundo.</p>
        </header>

        <footer>
          <InfoArticle
            icon={<BriefCaseSVG />}
            title={"Encuentra el trabajo de tus sueños"}
            description={"Busca miles de empleos de las mejores empresas de todo el mundo."}
          />
          <InfoArticle
            icon={<PeopleSVG />}
            title={"Conecta con las mejores empresas"}
            description={"Conecta con empresas que estan contatando por tus habilidades."}
          />
          <InfoArticle
            icon={<BuildingSVG />}
            title={"Obten el salario que mereces"}
            description={"Obten el salario que mereces con nuestra calculadora de salarios."}
          />
        </footer>
      </section>
    </main>
  )
}