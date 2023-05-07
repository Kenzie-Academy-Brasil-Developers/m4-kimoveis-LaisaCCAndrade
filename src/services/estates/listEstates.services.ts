import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import {
  TAllEstate,
  TRepositoryEstate,
} from "../../interfaces/estate.interfaces";
import { allSchemaEstate } from "../../schemas/estate.schemas";

const listEstateService = async (): Promise<TAllEstate> => {
  const estateRepository: TRepositoryEstate =
    AppDataSource.getRepository(RealEstate);
  const estateFind: RealEstate[] = await estateRepository.find({
    relations: {
      address: true,
      category: true,
    },
  });
  const estate = allSchemaEstate.parse(estateFind);

  return estate;
};

export default listEstateService;
