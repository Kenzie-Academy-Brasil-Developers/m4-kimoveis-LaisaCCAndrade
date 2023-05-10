import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

const ensureAdminExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const admin = res.locals.user.admin;

  if (admin === false) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureAdminExistsMiddleware;
