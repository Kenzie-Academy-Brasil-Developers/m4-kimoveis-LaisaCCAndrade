import { Router } from "express";
import {
  createUsersController,
  deleteUsersController,
  listUsersController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { createSchema, updateSchema } from "../schemas/users.schemas";
import ensureAdminExistsMiddleware from "../middlewares/ensureAdminExists.middlewares";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middlewares";
import ensureEmailNotExistsMiddleware from "../middlewares/ensureEmailNotExists.middlewares";
import ensureUserExistsMiddleware from "../middlewares/esureUserExists.middlewars";
import ensurePermissionMiddleware from "../middlewares/ensurePermission.middlewares";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  ensureDataIsValidMiddleware(createSchema),
  ensureEmailNotExistsMiddleware,
  createUsersController
);

userRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureAdminExistsMiddleware,
  listUsersController
);

userRoutes.patch(
  "/:id",
  ensureUserExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensurePermissionMiddleware,
  ensureDataIsValidMiddleware(updateSchema),
  updateUsersController
);

userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureAdminExistsMiddleware,
  deleteUsersController
);

export default userRoutes;
