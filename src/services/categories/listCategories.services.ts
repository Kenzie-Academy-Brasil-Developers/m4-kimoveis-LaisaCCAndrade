import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { TRepositoryCategory } from "../../interfaces/categories.interfaces";
import { allSchemaCategory } from "../../schemas/categories.schemas";

const listCategoriesService = async (): Promise<object> => {
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);
  const categoryFind = await categoryRepository.find();
  const category = allSchemaCategory.parse(categoryFind);

  return category;
};

export default listCategoriesService;
