import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../error";
import { TRepositoryCategory } from "../../interfaces/categories.interfaces";

const retrieveCategoriesService = async (
  categoryId: number
): Promise<object> => {
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);

  const categoryFind: Category | null = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    }
  });

  if (!categoryFind) {
    throw new AppError("Category not found", 404)
  }

  return categoryFind;
};

export default retrieveCategoriesService;
