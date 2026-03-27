import cors from "cors"

const ACCEPTED_ORIGINS = [
    "http://localhost:5173",
    "https://04-express-ashen.vercel.app/"
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
    return cors()
}