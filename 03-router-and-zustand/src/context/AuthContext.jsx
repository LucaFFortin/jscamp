import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(true)

    }

    const handleLogout = () => {
        setIsLoggedIn(false)
    }

    const value = {
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout
    }

    return (
        <AuthContext value={value}>
            {children}
        </AuthContext>
    )
}

// Envolvemos la funcionalidad del contexto en un custom hook que simplifique la implementacion
// Tambien es hacer uso de abstraction pattern para abstraer la complejidad de uso del contexto
// Mejora la experiencia de desarrollo y nos da la posibilidad de validar si el contexto esta siento
// usado en el lugar correcto.
/**
 * 
 * @returns {Object} Object with isLoggedIn, HandleLogin and HandleLogout
 * @throws {Error} if used outside of AuthProvider 
 * 
 * @example
 * function MyComponent() {
 *   const { isLoggedIn, handleLogin, handleLogout } = useAuth()
 *   return (
 *   <>
 *      {
 *          !isLoggedIn
 *          ?   <button onClick={handleLogin}>Login</button>
 *          :   <button onClick={handleLogout}>Logout</button>
 *      }
 *   </>
 *   )
 * }
 */
export function useAuth () {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("AuthContext must be used between AuthProvider");
    }

    return context
}