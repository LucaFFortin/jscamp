import { validateJob, validatePartialJob } from "../schemas/jobs.js";

export function validateCreate(req, res, next) {
    const result = validateJob(req.body)
    if (result.success) {
        req.body = result.data
        return next()
    }

    return res.status(400).json({ error: "input is invalid", details: result.error })
}

export function validateUpdate(req, res, next) {
    const result = validatePartialJob(req.body)
    if (result.success) {
        req.body = result.data
        return next()
    }

    return res.status(400).json({ error: "input is invalid", data: result.success, reqBody: req.body, error: result.error })
}