import * as z from "zod"

// partial solo hace opcionales las propiedades de primer nivel
// data debe de ser completado sino retornara errores
const jobSchema = z.object({
    titulo: z.string(),
    empresa: z.string(),
    ubicacion: z.string(),
    descripcion: z.string(),
    data: z.object({
        technology: z.string(),
        modalidad: z.enum(["remoto", "hibrido", "presencial", "FIFO"]),
        nivel: z.enum(["entry level", "pasantia", "trainee", "junior", "mid-level", "semi senior", "senior"]),
    })
})

export function validateJob(input) {
    return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
    const partialSchema = jobSchema.partial()
    return partialSchema.safeParse(input)
}