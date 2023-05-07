import { Request, Response, NextFunction } from "express";
import { TRepositoryCategory } from "../interfaces/categories.interfaces";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../error";

const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return next();
};

export default ensureCategoryExistsMiddleware;
