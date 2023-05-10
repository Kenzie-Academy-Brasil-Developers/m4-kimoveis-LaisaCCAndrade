import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { TRepositoryEstate } from "../../interfaces/estate.interfaces";

const listEstateService = async (): Promise<RealEstate[]> => {
  const estateRepository: TRepositoryEstate =
    AppDataSource.getRepository(RealEstate);

  const estateFind = await estateRepository.find({
    relations: {
      address: true,
    },
  });

  return estateFind;
};

export default listEstateService;
