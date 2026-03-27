import app from "./app.js"
import { before, after, describe, test } from "node:test"
import assert, { Assert } from "node:assert"

let server
const PORT = 2005
const BASE_URL = `http://localhost:${PORT}`

// antes de iniciar con los tests, iniciamos el servidor
before(async () => {
    await new Promise((resolve, reject) => {
        server = app.listen(PORT, (err) => {
            if (err) return reject(err)
            return resolve()
        })
    })
})

// al terminar los tests cerramos el servidor
after(async () => {
    await new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err)
            return resolve()
        })
    })
})

describe("GET /jobs", () => {
    test("Deberia devolver un JSON con todos los trabajos", async () => {
        const res = await fetch(`${BASE_URL}/jobs`)

        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.headers.get("content-type")?.includes("application/json"), true)

        const json = await res.json()
        assert.ok(Array.isArray(json.data), "Data deberia de ser un Array")
    })

    test("Deberia devolver trabajos por tecnologia", async () => {
        const technology = "react"

        const res = await fetch(`${BASE_URL}/jobs?technology=${technology}`)
        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.headers.get("content-type")?.includes("application/json"), true)

        const { data: jobs } = await res.json()

        assert.ok(jobs.every(job => job.data.technology.includes(technology)), "Solo deberian haber trabajos con la tecnologia propuesta")
    })

    test("Deberia devolver trabajos por nivel", async () => {
        const nivel = "junior"

        const res = await fetch(`${BASE_URL}/jobs?level=${nivel}`)
        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.headers.get("content-type")?.includes("application/json"), true)

        const { data: jobs } = await res.json()

        assert.ok(jobs.every(job => job.data.nivel.includes(nivel)), "Solo deberian haber trabajos con el nivel propuesto")
    })

    test("Deberia devolver trabajos por tipo", async () => {
        const tipo = "remoto"

        const res = await fetch(`${BASE_URL}/jobs?type=${tipo}`)
        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.headers.get("content-type")?.includes("application/json"), true)

        const { data: jobs } = await res.json()

        assert.ok(jobs.every(job => job.data.modalidad.includes(tipo)), "Solo deberian haber trabajos con la modalidad propuesta")
    })

    test("Deberia devolver trabajos filtrados por texto", async () => {
        const query = "analista"

        const res = await fetch(`${BASE_URL}/jobs?text=${query}`)
        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.headers.get("content-type")?.includes("application/json"), true)

        const { data: jobs } = await res.json()

        assert.ok(jobs.every(job => job.titulo.includes(query) || job.descripcion.includes(query)), "Solo deberian haber trabajos filtrados por texto")
    })

    test("Deberia devolver el trabajo especificado", async () => {
        const id = "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4"

        const res = await fetch(`${BASE_URL}/jobs/${id}`)

        assert.strictEqual(res.status, 200)
        assert.strictEqual(res.headers.get("content-type")?.includes("application/json"), true)

        const data = await res.json()

        assert.strictEqual(data.id, id)
    })

})

describe("POST /jobs", () => {
    test("deberia de crear un trabajo", async () => {
        const newJob = {
            titulo: "Analista Funcional",
            empresa: "Tech inc.",
            descripcion: "Se busca un analista funcional con experiencia",
            ubicacion: "Buenos Aires",
            data: {
                modalidad: "remoto",
                technology: "jira",
                nivel: "junior",
            },
        }

        const res = await fetch(`${BASE_URL}/jobs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })

        assert.strictEqual(res.status, 201)
    })
})

describe("PUT /jobs", () => {
    test("deberia reemplazar un trabajo", async () => {
        const id = "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4"

        const newJob = {
            titulo: "Analista Funcional",
            empresa: "Tech inc.",
            descripcion: "Se busca un analista funcional con experiencia",
            ubicacion: "Buenos Aires",
            data: {
                modalidad: "remoto",
                technology: "jira",
                nivel: "junior",
            },
        }

        const res = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
        assert.strictEqual(res.status, 302)

    })
})

describe("PATCH /jobs", () => {
    test("deberia actualizar un trabajo", async () => {
        const id = "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4"

        const newJob = {
            titulo: "Analista Funcional",
            empresa: "Tech inc.",
            descripcion: "Se busca un analista funcional con experiencia",
            ubicacion: "Buenos Aires",
            data: {
                modalidad: "remoto",
                technology: "jira",
                nivel: "junior",
            },
        }

        const res = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
        assert.strictEqual(res.status, 302)

    })
})

describe("DELETE /jobs", () => {
    test("deberia de reemplazar un trabajo", async () => {
        const id = "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4"

        const res = await fetch(`${BASE_URL}/jobs/${id}`, {
            method: "DELETE",
        })
        assert.strictEqual(res.status, 302)
    })
})

