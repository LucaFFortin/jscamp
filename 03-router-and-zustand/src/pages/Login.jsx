import { useAuthStore } from "../store/auth"
import styles from "./Login.module.css"

const AuthButton = () => {
  const { login } = useAuthStore()

  const handleClick = (e) => {
    e.preventDefault()

    login()
  }

  return (
    <button type="submit" onClick={handleClick}>Iniciar sesión</button>
  )
}

export default function Login() {
  return (
    <main className={styles.loginMainArticle}>
      <article className="login-container">
        <section className="welcome">
          <h2>Bienvenido nuevamente</h2>
          <p>Inicia sesión para encontrar tu proxima oportunidad</p>
        </section>
        <section className="form-container">
          <form method="POST" className={styles.loginForm}>
            <label className={styles.userLabel}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mail">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
              <input type="text" placeholder="Email" />
            </label>
            <label className={styles.userLabel}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
              </svg>
              <input type="password" placeholder="Password" />
            </label>
            <div>
              <label>
                <input type="checkbox" />
                Recordarme
              </label>

              <a href="#">Olvide mi contraseña</a>
            </div>

            <AuthButton />
            <section className="signup">
              <p>¿No tienes una cuenta?</p>
              <div>
                <button>Registrarte como usuario</button>
                <button>Registrarte como empresa</button>
              </div>
            </section>
          </form>
        </section>
      </article>
    </main>
  )
}