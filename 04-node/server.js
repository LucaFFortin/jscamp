import { randomUUID } from "node:crypto"
import { createServer } from "node:http"
import { json } from "node:stream/consumers"
import { URL } from "node:url"

process.loadEnvFile()

const port = process.env.PORT ?? 3000

const users = [
    { id: 1, user: "luca", username: "lurr" },
    { id: 2, user: "pepe", username: "papo" },
    { id: 3, user: "pepa", username: "pepa" },
    { id: 4, user: "pipa", username: "pipa" },
    { id: 5, user: "florcita", username: "mieko_hana" },
]

const sendJson = (res, statusCode, data) => {
    res.statusCode = statusCode
    res.setHeader("content-type", "application/json; charset=utf-8")
    return res.end(JSON.stringify(data))
}

let server = createServer(async (req, res) => {
    const { method, url } = req
    const {pathname, searchParams} = new URL(url, `http://${req.headers.host}/`)

    if (method === "GET") {
        if (pathname === "/health") {
            const healthInfo = {
                status: "ok",
                uptime: process.uptime(),
                timestamp: Date.now(),
            }
            return sendJson(res, 200, healthInfo)
        }

        if (pathname === "/users") {
            if (Number.isNaN(Number(searchParams.get("limit"))) || 
                Number.isNaN(Number(searchParams.get("offset")))) {
                return sendJson(res, 400, {error: "Limit and offset must be numbers"})
            }

            // users.length puede causar problemas de rendimiento a futuro, debemos usar un numero fijo.
            const limit = Number(searchParams.get("limit")) || users.length
            const offset = Number(searchParams.get("offset")) || 0

            const paginatedUsers = users.slice(offset, limit + offset)

            return sendJson(res, 200, paginatedUsers)
        }
    }

    if (method === "POST") {
        if (pathname === "/users") {
            const body = await json(req)
            
            if (!body || !body.name || !body.username) return sendJson(res, 400, {error: "name and username is required"})

            const newUser = {
                name: body.name,
                username: body.username,
                id: randomUUID(),
            }

            users.push(newUser)

            return sendJson(res, 201, {status: "user created"});
        }
    }

    return sendJson(res, 404, { error: "not found" })
})

server.listen(port, () => {
    console.log(`escuchando en http://localhost:${port}`);
})