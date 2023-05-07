import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.services";
import listUsersService from "../services/users/listUsers.services";
import { TCreate, TUpdate } from "../interfaces/users.interfaces";
import updateUsersService from "../services/users/updateUsers.services";
import deleteUsersService from "../services/users/deleteUsers.services";

const createUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TCreate = req.body;

  const newUser = await createUsersService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await listUsersService();

  return res.status(200).json(users);
};

const updateUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TUpdate = req.body;
  const id: number = parseInt(req.params.id);
  const update = await updateUsersService(user, id);

  return res.json(update);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const deleted = await deleteUsersService(parseInt(req.params.id));

  return res.status(204).send();
};

export {
  createUsersController,
  listUsersController,
  updateUsersController,
  deleteUsersController,
};
