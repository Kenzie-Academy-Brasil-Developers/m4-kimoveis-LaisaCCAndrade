import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { TRepositoryCategory } from "../../interfaces/categories.interfaces";
import { TRepositoryEstate } from "../../interfaces/estate.interfaces";
import { returnSchemaCategory } from "../../schemas/categories.schemas";

const retrieveCategoriesService = async (
  categoryId: number
): Promise<object> => {
  const estateRepository: TRepositoryEstate =
    AppDataSource.getRepository(RealEstate);
  const categoryRepository: TRepositoryCategory = AppDataSource.getRepository(Category);
  const categoryFind = await categoryRepository.findOneBy({
    id: categoryId,
  });
  const category = returnSchemaCategory.parse(categoryFind);
  const estateFind: RealEstate[] = await estateRepository.find({
    where: {
      category: category,
    },
  });
  const estateInTheCategory = {
    ...category,
    estate: estateFind,
  };

  return estateInTheCategory;
};

export default retrieveCategoriesService;
