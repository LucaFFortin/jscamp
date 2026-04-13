import { test } from "node:test"
import assert from "node:assert"

import { Stagehand } from "@browserbasehq/stagehand"

process.loadEnvFile()

console.log(process.env.OPEN_AI_KEY)

test("Deberia de poder acceder a la seccion buscar y ver el primer empleo", async () => {
    const stagehand = new Stagehand({
        env: "LOCAL",
        model: "openai/gpt-5-mini"
    })

    await stagehand.init()

    const [page] = stagehand.context.pages()

    await page.goto("http://localhost:5173")

    await stagehand.act("ve al boton 'Buscar' y hazle click")

    const { extraction } = await stagehand.extract("obten el titulo del primer trabajo.")

    console.log("valor extraido", extraction)

    assert(extraction, "Desarrollador de Software Senior")
})