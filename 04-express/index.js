import express from 'express'
import { randomUUID } from "node:crypto"
import jobs from "./jobs.json" with { type: "json" }
import { DEFAULTS } from './config.js'

import cors from "cors"

const PORT = process.env.PORT ?? DEFAULTS.PORT

const app = express()

const ACCEPTED_ORIGINS = [
    "http://localhost:5173"
]

app.use(cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) return callback(null, true) // primer parametro para el error
        return callback(new Error("Origin in not allowed"))
    }
}))

app.use(express.json())

app.use((req, res, next) => {
    const timeString = new Date().toLocaleTimeString()
    console.log(`${timeString} ${req.url} ${req.method}`);
    next()
})

app.get("/", (req, res) => {
    res.send("hello world!")
})

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime(),
    })
})

// app.get("/get-jobs") representa una accion
// app.get("/jobs")     representa un recurso, la lista de trabajos

app.get("/jobs", (req, res) => {
    const { limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFFSET_PAGINATION, technology, type, level, text } = req.query
    // peticion a la base de datos

    let filteredJobs = jobs
    let totalJobsCount = jobs.length

    if (text) {
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
            job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm)
        )
    }

    if (technology) {
        const searchTerm = technology.toLowerCase()
        filteredJobs = filteredJobs.filter(job => {
            return typeof job.data.technology === "string"
                ? job.data.technology.toLowerCase().includes(searchTerm)
                : job.data.technology.some(tech => tech.toLowerCase().includes(searchTerm))
        })
    }


    if (type) {
        const searchTerm = type.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
            job.data.modalidad.toLowerCase().includes(searchTerm)
        )
    }

    if (level) {
        const searchTerm = level.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
            job.data.nivel.toLowerCase().includes(searchTerm)
        )
    }

    if (offset) {
        filteredJobs = filteredJobs.slice(offset)
    }

    if (limit) {
        const numberLimit = Number(limit)
        filteredJobs = filteredJobs.slice(0, numberLimit)
    }

    res.json({ data: filteredJobs, limit: limit, offset: offset, results: filteredJobs.length, total: totalJobsCount })
})

app.get("/jobs/:id", (req, res) => {
    const { id } = req.params

    const job = jobs.find(job => job.id === id)

    if (!job) return res.status(404).json({ error: "Job not found" })

    return res.json(job)
})

app.post("/jobs", (req, res) => {
    const { titulo, descripcion, empresa, ubicacion, data } = req.body

    const newJob = {
        id: randomUUID(),
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data,
    }

    jobs.push(newJob)

    return res.status(201).json(newJob)
})

app.put("/jobs/:id", (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, empresa, ubicacion, data } = req.body

    const newJob = {
        id,
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data,
    }

    const jobToReplaceIndex = jobs.findIndex(elem => elem.id === id)

    if (jobToReplaceIndex === -1) return res.status(404).json({ error: `Job with id ${id} not found` })

    jobs = jobs.toSpliced(jobToReplaceIndex, 1, newJob)

    return res.status(302).json("Job has been replaced")
})

app.patch("/jobs/:id", (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, empresa, ubicacion, data } = req.body

    let jobToUpdateIndex
    const jobToUpdate = jobs.find((elem, index) => {
        if (elem.id === id) {
            jobToUpdateIndex = index
            return elem
        }
    })

    if (!jobToUpdate) return res.status(404).json({ error: `Job with id ${id} not found` })

    const newJob = {
        id,
        titulo: !titulo ? jobToUpdate.titulo : titulo,
        empresa: !empresa ? jobToUpdate.empresa : empresa,
        ubicacion: !ubicacion ? jobToUpdate.ubicacion : ubicacion,
        descripcion: !descripcion ? jobToUpdate.descripcion : descripcion,
        data: !data ? jobToUpdate.data : data,
    }

    jobs = jobs.toSpliced(jobToUpdateIndex, 1, newJob)

    return res.status(302).json("Job has been updated")
})

app.delete("/jobs/:id", (req, res) => {
    // TODO
})

app.use((req, res) => {
    res.status(404).send('No encontrado')
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})

