import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TAllCategory, TRepositoryCategory } from "../../interfaces/categories.interfaces";
import { allSchemaCategory } from "../../schemas/categories.schemas";

const listCategoriesService = async (): Promise<TAllCategory> => {
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);
  const categoryFind: Category[] = await categoryRepository.find();
  const category = allSchemaCategory.parse(categoryFind);

  return category;
};

export default listCategoriesService;
