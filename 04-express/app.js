import express from 'express'

import { DEFAULTS } from './config.js'
import { corsMiddleware } from './middlewares/cors.js'
import { jobsRouter } from './routes/jobs.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(corsMiddleware())

app.use("/jobs", jobsRouter)

app.use(express.json())

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`server listening on http://localhost:${PORT}`)
    })
}

export default app
