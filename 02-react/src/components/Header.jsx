export function Header() {
    return (
        <header className="body-header">
            <a href="/">
                <h1>DevJobs</h1>
            </a>

            <nav>
                <a href="/search">Buscar</a>
            </nav>

            <div>
                <a href="#">Publicar un empleo</a>
                <a href="/login">Iniciar sesion</a>
            </div>

        </header>
    )
}