import jobs from "../data/jobs.json" with { type: "json" }
import { randomUUID } from "node:crypto"

export class JobModel {
    static async getAll({ limit, offset, technology, type, level, text }) {
        let filteredJobs = jobs
        let totalJobsCount = jobs.length
        // console.log(technology);

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

        return { filteredJobs, totalJobsCount }
    }

    static async getById(id) {
        const job = jobs.find(job => job.id === id)

        return job
    }

    static async create({ titulo, descripcion, empresa, ubicacion, data }) {
        const newJob = {
            id: randomUUID(),
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data,
        }

        jobs.push(newJob)

        return newJob
    }

    static async update({ id, titulo, descripcion, empresa, ubicacion, data }) {
        const newJob = {
            id,
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data,
        }

        const jobToReplaceIndex = jobs.findIndex(elem => elem.id === id)

        if (jobToReplaceIndex === -1) return null

        jobs.splice(jobToReplaceIndex, 1, newJob)

        return jobToReplaceIndex
    }

    static async partialUpdate({ id, titulo, descripcion, empresa, ubicacion, data }) {

        let jobToUpdateIndex
        const jobToUpdate = jobs.find((elem, index) => {
            if (elem.id === id) {
                jobToUpdateIndex = index
                return elem
            }
        })

        if (!jobToUpdate) return null

        const newJob = {
            id,
            titulo: !titulo ? jobToUpdate.titulo : titulo,
            empresa: !empresa ? jobToUpdate.empresa : empresa,
            ubicacion: !ubicacion ? jobToUpdate.ubicacion : ubicacion,
            descripcion: !descripcion ? jobToUpdate.descripcion : descripcion,
            data: !data ? jobToUpdate.data : data,
        }

        jobs.splice(jobToUpdateIndex, 1, newJob)

        return jobToUpdateIndex
    }

    static async detele({ id }) {
        const jobToDeleteIndex = jobs.findIndex(elem => elem.id === id)
        
        if (jobToDeleteIndex === -1) return null

        jobs.splice(jobToDeleteIndex, 1)

        return jobToDeleteIndex
    }
}