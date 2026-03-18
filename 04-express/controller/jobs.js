
import { DEFAULTS } from "../config.js"
import { JobModel } from "../models/job.js"
// se puede realizar con funciones, clases con propiedades estaticas 

// clases con metodos estaticos
export class JobController {
    static async getAll(req, res) {
        // recibimos los datos de la peticion
        const { limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFFSET_PAGINATION, technology, type, level, text } = req.query
        // peticion a la base de datos

        // los enviamos a el modelo
        // el modelo gestiona los datos
        // nos retorna los datos filtrados y el total
        const { filteredJobs, totalJobsCount } = await JobModel.getAll(limit, offset, technology, type, level, text)

        // enviamos los datos a la vista
        res.json({ data: filteredJobs, limit: limit, offset: offset, results: filteredJobs.length, total: totalJobsCount })
    }

    static async getById(req, res) {
        const { id } = req.params

        const job = await JobModel.getById(id)

        if (!job) return res.status(404).json({ error: "Job not found" })

        return res.json(job)
    }

    static async create(req, res) {
        const { titulo, descripcion, empresa, ubicacion, data } = req.body

        const newJob = await JobModel.create({ titulo, descripcion, empresa, ubicacion, data })

        return res.status(201).json(newJob)
    }

    static async update(req, res) {
        const { id } = req.params
        const { titulo, descripcion, empresa, ubicacion, data } = req.body

        const jobToReplaceIndex = await JobModel.update({ id, titulo, descripcion, empresa, ubicacion, data })

        if (!jobToReplaceIndex) return res.status(404).json({ error: `Job with id ${id} not found` })

        return res.status(302).json("Job has been replaced")
    }

    static async partialUpdate(req, res) {
        const { id } = req.params
        const { titulo, descripcion, empresa, ubicacion, data } = req.body

        let jobToUpdateIndex = await JobModel.partialUpdate({ id, titulo, descripcion, empresa, ubicacion, data })

        if (!jobToUpdateIndex) return res.status(404).json({ error: `Job with id ${id} not found` })

        return res.status(302).json("Job has been updated")
    }

    static async detele(req, res) {
        const { id } = req.params

        const jobToDeleteIndex = await JobModel.detele({ id })

        if (!jobToDeleteIndex) return res.status(404).json({ error: `Job with id ${id} not found` })

        res.status(302).json(`Job with id: ${id}has been Deleted`)
        // TODO
    }
}