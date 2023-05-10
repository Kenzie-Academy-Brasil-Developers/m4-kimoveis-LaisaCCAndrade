import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middlewares";
import { loginSchema } from "../schemas/login.schemas";
import createLoginController from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", createLoginController);

export default loginRoutes;
