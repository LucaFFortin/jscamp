import cors from "cors"

const ACCEPTED_ORIGINS = [
    "http://localhost:5173"
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin)) return callback(null, true) // primer parametro para el error
            return callback(new Error("Origin in not allowed"))
        }
    })
}