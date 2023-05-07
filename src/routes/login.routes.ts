import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { loginSchema } from "../schemas/login.schemas";
import createLoginController from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureDataIsValidMiddleware(loginSchema),
  createLoginController
);

export default loginRoutes;
