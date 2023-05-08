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
  const schedule = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.realEstateId = :realEstateId", {
      realEstateId: scheduleData.realEstateId,
    })
    .andWhere("schedule.date = :date", {
      date: scheduleData.date,
    })
    .andWhere("schedule.hour = :hour", {
      hour: scheduleData.hour,
    })
    .getOne();

  if (schedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (scheduleData.hour < "07:00" || scheduleData.hour > "18:00") {
    throw new AppError("Invalid hour, available times are 8AM to 18PM");
  }

  const newDate = new Date(scheduleData.date);
  const week = newDate.getDate();

  if (week === 0 || week === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  const estateFind: RealEstate | null = await estateRepository.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!estateFind) {
    throw new AppError("RealEstate not found", 404);
  }

  const scheduleFind = await scheduleRepository.findOneBy({
    date: scheduleData.date,
    hour: scheduleData.hour,
  });

  if (scheduleFind) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }
  const userFind: User | null = await userRepository.findOneBy({
    id: userId,
  });
  const newSchedule: Schedule = scheduleRepository.create({
    ...scheduleData,
    realEstate: estateFind,
    user: userFind!,
  });
  await scheduleRepository.save(newSchedule);

  return newSchedule;
};

export default createSchedulesService;
