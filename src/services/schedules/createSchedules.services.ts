import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../error";
import { TRepositoryEstate } from "../../interfaces/estate.interfaces";
import {
  TCreateSchedule,
  TRepositorySchedule,
} from "../../interfaces/schedules.interfaces";
import { TRepository } from "../../interfaces/users.interfaces";

const createSchedulesService = async (
  scheduleData: TCreateSchedule,
  userId: number
): Promise<object> => {
  const scheduleRepository: TRepositorySchedule =
    AppDataSource.getRepository(Schedule);

  const userRepository: TRepository = AppDataSource.getRepository(User);

  const estateRepository: TRepositoryEstate =
    AppDataSource.getRepository(RealEstate);

  const user: User | null = await userRepository.findOneBy({
    id: Number(userId),
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  let estate: RealEstate | null;

  if (scheduleData.realEstateId) {
    estate = await estateRepository.findOneBy({
      id: Number(scheduleData.realEstateId),
    });

    if (!estate) {
      throw new AppError("RealEstate not found", 404);
    }
  }

  const newSchedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: estate!,
    user: user!,
  });
  await scheduleRepository.save(newSchedule);

  return { message: "Schedule created" };
};

export default createSchedulesService;
