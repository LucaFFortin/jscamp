import { Router } from "express";
import { JobController } from "../controller/jobs.js";
import { validateCreate, validateUpdate } from "../middlewares/jobsValidation.js";

export const jobsRouter = Router()

// no hace falta el /jobs porque este viene desde app.use()
jobsRouter.get("/", JobController.getAll)

jobsRouter.get("/:id", JobController.getById)

jobsRouter.post("/", validateCreate, JobController.create)

jobsRouter.put("/:id",validateCreate, JobController.update)

jobsRouter.patch("/:id", validateUpdate, JobController.partialUpdate)

jobsRouter.delete("/:id", JobController.detele)