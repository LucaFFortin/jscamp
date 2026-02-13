import { Link } from "./Link";

export function Header() {
    return (
        <header className="body-header">
            <Link href="/" className={"hero"}>
                <h1>DevJobs</h1>
            </Link>

            <nav>
                <Link href="/search">Buscar</Link>
            </nav>

            <div>
                <Link href="#">Publicar un empleo</Link>
                <Link href="/login">Iniciar sesion</Link>
            </div>

        </header>
    )
}