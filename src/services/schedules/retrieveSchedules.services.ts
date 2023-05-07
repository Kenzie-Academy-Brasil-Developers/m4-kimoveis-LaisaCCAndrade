import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../error";
import {
  TRepositoryEstate,
  TReturnEstate,
} from "../../interfaces/estate.interfaces";

const retrieveSchedulesService = async (
  realEstate: number
): Promise<TReturnEstate> => {
  const estateRepository: TRepositoryEstate =
    AppDataSource.getRepository(RealEstate);
  const estateFind: RealEstate | null = await estateRepository.findOne({
    where: {
      id: realEstate,
    },
    relations: {
      address: true,
      category: true,
      schedules: {
        user: true,
      },
    },
  });

  if (!estateFind) {
    throw new AppError("RealEstate not found", 404);
  }

  return estateFind;
};

export default retrieveSchedulesService;
