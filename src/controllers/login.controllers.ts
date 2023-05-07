import { Request, Response } from "express";
import { TLogin } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.services";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData: TLogin = req.body;
  const token = await createLoginService(loginData);

  return res.json({ token: token });
};

export default createLoginController;
