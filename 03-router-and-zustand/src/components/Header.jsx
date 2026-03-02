import { Link } from "./Link";
import { NavLink } from "react-router";
import { useAuthStore } from "../store/auth";
import { useFavoritesStore } from "../store/favorites";

export function Header() {
    return (
        <header className="body-header">
            <Link href="/" className={"hero"}>
                <h1>DevJobs</h1>
            </Link>

            <nav>
                <NavLink
                    to="/search"
                    className={({ isActive }) => (isActive ? 'header-nav-link active' : 'header-nav-link')}
                >
                    Buscar
                </NavLink>
                <ProfileLink />
            </nav>

            <div>
                <Link href="#">Publicar un empleo</Link>
                <AuthLink />
            </div>

        </header>
    )
}

const AuthLink = () => {
    const { isLoggedIn, logout } = useAuthStore()
    const { clearFavorites } = useFavoritesStore()

    const handleLogout = () => {
        logout()
        clearFavorites()
    }

    return (
        <>
            {
                !isLoggedIn
                    ? <Link href="/login">Iniciar sesión</Link>
                    : <button onClick={handleLogout}>Cerrar sesión</button>
            }
        </>
    )
}

const ProfileLink = () => {
    const { isLoggedIn } = useAuthStore()
    const { count } = useFavoritesStore()

    const favoritesAmount = count()

    return (
        isLoggedIn && (
            <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? 'header-nav-link active' : 'header-nav-link')}
            >
                Profile ❤️ {favoritesAmount}
            </NavLink>
        )
    )
}