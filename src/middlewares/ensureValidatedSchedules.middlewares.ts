import { Request, Response, NextFunction } from "express";
import { TCreateSchedule } from "../interfaces/schedules.interfaces";
import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";
import { AppError } from "../error";

const ensureValidatedSchudelesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schedulesInformations: TCreateSchedule = req.body;
  const userId: string = res.locals.user.id;
  const scheduleRepository = AppDataSource.getRepository(Schedule);

  const scheduleHour: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule_user")
    .where("schedule_user.date = :date", { date: schedulesInformations.date })
    .andWhere("schedule_user.realEstate = :estate", {
      estate: schedulesInformations.realEstateId,
    })
    .andWhere("schedule_user.hour = :hour", {
      hour: schedulesInformations.hour,
    })
    .getOne();

  if (scheduleHour) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const scheduleUser: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule_user")
    .where("schedule_user.date = :date", { date: schedulesInformations.date })
    .andWhere("schedule_user.hour = :hour", {
      hour: schedulesInformations.hour,
    })
    .andWhere("schedule_user.userId = :id", { id: userId })
    .getOne();

  if (scheduleUser) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const scheduleEstate: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule_user")
    .where("schedule_user.userId = :id", { id: userId })
    .andWhere("schedule_user.realEstate = :estate", {
      estate: schedulesInformations.realEstateId,
    })
    .getOne();

  if (scheduleEstate) {
    throw new AppError("User schedule to this real estate already exists", 409);
  }

  const [timeOfDay] = schedulesInformations.hour.split(":");

  if (Number(timeOfDay) < 8 || Number(timeOfDay) > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const dayOfTheWeek: Date = new Date(schedulesInformations.date);
  const dayByDay: number = dayOfTheWeek.getDay();
  dayOfTheWeek.getHours();

  if (dayByDay === 0 || dayByDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};

export default ensureValidatedSchudelesMiddleware;
