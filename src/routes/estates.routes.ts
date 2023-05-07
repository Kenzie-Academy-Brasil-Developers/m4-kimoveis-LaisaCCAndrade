import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureAdminExistsMiddleware from "../middlewares/ensureAdminExists.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { createSchemaEstate } from "../schemas/estate.schemas";
import {
  createEstateController,
  listEstateController,
} from "../controllers/estates.controllers";

const estatesRoutes: Router = Router();

estatesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  ensureDataIsValidMiddleware(createSchemaEstate),
  createEstateController
);

estatesRoutes.get("", listEstateController);

export default estatesRoutes;
