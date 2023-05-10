import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const idUser =  parseInt(req.params.id)
  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export default ensureUserExistsMiddleware;
