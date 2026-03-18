import { Router } from "express";
import { JobController } from "../controller/jobs.js";

export const jobsRouter = Router()

// no hace falta el /jobs porque este viene desde app.use()
jobsRouter.get("/", JobController.getAll)

jobsRouter.get("/:id", JobController.getById)

jobsRouter.post("/", JobController.create)

jobsRouter.put("/:id", JobController.update)

jobsRouter.patch("/:id", JobController.partialUpdate)

jobsRouter.delete("/:id", JobController.detele)