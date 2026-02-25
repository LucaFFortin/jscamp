import { Link } from "./Link";

export function Footer() {
    return (
        <footer className="body-footer">
            <small>&copy; 2025 DevJobs. Todos los derechos reservados.</small>
            <div>
                <Link href={"/contact"}>Contacto</Link>
                {/* <a href="/contact">Contacto</a> */}
                <a href="#">Soporte</a>
                <a href="#">Terminos</a>
            </div>
        </footer>
    )
}