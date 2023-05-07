import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { createSchemaSchedule } from "../schemas/schedules.schemas";
import {
  createSchedulesController,
  retrieveSchedulesController,
} from "../controllers/schedules.controllers";
import ensureAdminExistsMiddleware from "../middlewares/ensureAdminExists.middlewares";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(createSchemaSchedule),
  createSchedulesController
);

schedulesRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  retrieveSchedulesController
);

export default schedulesRoutes;
