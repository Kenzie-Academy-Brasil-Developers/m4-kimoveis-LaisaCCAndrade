import { NextFunction, Request, Response } from "express";
import { TRepositoryCategory } from "../interfaces/categories.interfaces";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

const ensureNameCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export default ensureNameCategoryMiddleware;
