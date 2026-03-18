import express from 'express'
import jobs from "./jobs.json" with { type: "json" }
import { DEFAULTS } from './config.js'


const PORT = process.env.PORT ?? DEFAULTS.PORT

const app = express()

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

// path opcional, podemos evitar escribir c
app.get("/ab{c}d", (req, res) => {
    console.log("abcd o abd?");
})

// comodin, podemos escribir cualquier cosa en el asterisco, lo que pongamos despues de este sera el nombre del comodin
app.get("/luca*flor", (req, res) => {
    res.send(String(req.url).replaceAll("%20", " "))
})
