import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";
import { TRepository } from "../interfaces/users.interfaces";
import { User } from "../entities";

const ensureEmailNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: TRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default ensureEmailNotExistsMiddleware;
