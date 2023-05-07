import {
  TCreateCategory ,
  TRepositoryCategory,
  TReturnCategory,
} from "../../interfaces/categories.interfaces";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { returnSchemaCategory } from "../../schemas/categories.schemas";

const createCategoriesService = async (
  categoryData: TCreateCategory 
): Promise<TReturnCategory> => {
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);
  const category: Category = categoryRepository.create(categoryData);

  await categoryRepository.save(category);

  const newCategory = returnSchemaCategory.parse(category);

  return newCategory;
};

export default createCategoriesService;
