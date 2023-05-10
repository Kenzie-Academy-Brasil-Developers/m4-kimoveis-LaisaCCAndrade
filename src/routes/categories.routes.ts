import { Router } from "express";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureAdminExistsMiddleware from "../middlewares/ensureAdminExists.middlewares";
import ensureNameCategoryMiddleware from "../middlewares/ensureNameCategory.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import ensureCategoryExistsMiddleware from "../middlewares/ensureCategoryExists.middlewares";
import { createSchemaCategory } from "../schemas/categories.schemas";
import {
  createCategoryController,
  listCategoryController,
  retrieveCategoryController,
} from "../controllers/categories.controllers";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  ensureNameCategoryMiddleware,
  ensureDataIsValidMiddleware(createSchemaCategory),
  createCategoryController
);

categoriesRoutes.get("", listCategoryController);

categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategoryExistsMiddleware,
  retrieveCategoryController
);

export default categoriesRoutes;
