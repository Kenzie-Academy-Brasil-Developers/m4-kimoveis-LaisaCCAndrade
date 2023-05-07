import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensurePermissionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idUser: number = parseInt(req.body.id);
  const { admin, id } = req.user;

  if (!admin) {
    if (idUser !== id) {
      throw new AppError("Insufficient permission", 403);
    }
    const { admin, ...payload } = req.body;

    req.body = {
      ...payload,
    };
  }

  return next();
};

export default ensurePermissionMiddleware;