import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import {
  TCreateEstate,
  TRepositoryEstate,
  TReturnEstate,
} from "../../interfaces/estate.interfaces";
import { TRepositoryAddress } from "../../interfaces/addresses.interfaces";
import { TRepositoryCategory } from "../../interfaces/categories.interfaces";
import { AppError } from "../../error";
import { returnSchemaEstate } from "../../schemas/estate.schemas";

const createEstateService = async (
  estateData: TCreateEstate
): Promise<TReturnEstate> => {
  const addressRepository: TRepositoryAddress =
    AppDataSource.getRepository(Address);
  const address: Address = addressRepository.create(estateData.address);
  const addressFind = await addressRepository.findOneBy({
    street: String(address.street),
    number: String(address.number),
  });

  if (addressFind) {
    throw new AppError("Address already exists", 409);
  }

  await addressRepository.save(address);
  const categoryRepository: TRepositoryCategory =
    AppDataSource.getRepository(Category);
  const categoryFind = await categoryRepository.findOneBy({
    id: Number(estateData.categoryId),
  });

  if (!categoryFind) {
    throw new AppError("Category not found", 404);
  }
  const estateRepository: TRepositoryEstate =
    AppDataSource.getRepository(RealEstate);
  const estate = estateRepository.create({
    ...estateData,
    address,
    category: categoryFind,
  });
  await estateRepository.save(estate);
  const newEstate = returnSchemaEstate.parse(estate);

  return newEstate;
};

export default createEstateService;
