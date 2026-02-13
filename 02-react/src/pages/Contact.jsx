import { useState } from "react"
import styles from "./contact.module.css"

export function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        message: "",
    })

    const [error, setError] = useState({
        name: false,
        email: false,
        title: false,
        message: false,
    })

    const [isSending, setIsSending] = useState(false)

    const validateName = (name) => {
        if (name.length <= 0 || name.length > 30) return false
        return true
    }

    const validateEmail = (email) => {
        if (email.length >= 8 && email.length <= 60 && email.includes('@') && email.includes('.')) return true
        return false
    }

    const validateTitle = (title) => {
        if (title.length < 4 || title.length > 50) return false
        return true
    }

    const validateMessage = (message) => {
        if (message.length <= 0 || message.length > 500) return false
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let formData = new FormData(e.target)

        let name = formData.get("name")
        let email = formData.get("email")
        let title = formData.get("title")
        let message = formData.get("message")
        

        const isNameValid = validateName(name)
        const isMailValid = validateEmail(email)
        const isTitleValid = validateTitle(title)
        const isMessageValid = validateMessage(message)

        console.log(isMailValid);
        
        setError({
            name: isNameValid ? false : true,
            email: isMailValid ? false : true,
            title: isTitleValid ? false : true,
            message: isMessageValid ? false : true,
        })


        if (!isNameValid || !isMailValid || !isTitleValid || !isMessageValid) return

        setFormData(formData)
        // setIsSending(true)
    }

    if (isSending) return (
        <main className={styles.mainContact}>
            <h1>Gracias por su consulta</h1>
            <h3>sera contactado en la brevedad</h3>
        </main>
    )

    return (
        <main className={styles.mainContact}>
            <h1>Dejanos tu consulta</h1>
            <h3>Por favor rellena el formulario para contactarte con nosotros</h3>

            <form className={styles.formContact} onSubmit={handleSubmit}>
                <label className={`${styles.userLabel} ${error.name ? "error" : ""}`}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre"
                        onFocus={() => setError({...error, name: false})}
                        // onBlur={() => formData.name.length <= 0 ? setError({...error, name: true}) : setError({...error, name: false})}              
                    />
                </label>
                <label className={`${styles.userLabel} ${error.email ? "error" : ""}`}>
                    <input
                        name="email"
                        type="text"
                        inputMode="email"
                        placeholder="Correo electronico"
                        onFocus={() => setError({...error, email: false})}
                        // onBlur={() => formData.email.length < 8 ? setError({ ...error, email: true }) : setError({ ...error, email: false })}
                    />
                </label>
                <label className={`${styles.userLabel} ${error.title ? "error" : ""}`}>
                    <input
                        name="title"
                        type="text"
                        placeholder="Asunto"
                        onFocus={() => setError({...error, title: false})}
                        // onBlur={() => formData.title.length < 8 ? setError({ ...error, title: true }) : setError({ ...error, title: false })}
                    />
                </label>
                <label className={`${styles.userLabel} ${error.message ? "error" : ""}`}>
                    <textarea 
                        name="message" 
                        placeholder="Pon tu comentario aqui" 
                        onFocus={() => setError({...error, message: false})}
                    />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </main>
    )
}