import { Link } from "./Link";
import { NavLink } from "react-router";

export function Header() {
    return (
        <header className="body-header">
            <Link href="/" className={"hero"}>
                <h1>DevJobs</h1>
            </Link>

            <nav>
                <NavLink 
                    to="/search"
                    className={({isActive}) => (isActive ? 'header-nav-link active': 'header-nav-link')}
                    >
                    Buscar
                </NavLink>
            </nav>

            <div>
                <Link href="#">Publicar un empleo</Link>
                <Link href="/login">Iniciar sesion</Link>
            </div>

        </header>
    )
}