import { z } from "zod";
import {
  allSchemaSchedule,
  createSchemaSchedule,
  returnSchemaSchedule,
} from "../schemas/schedules.schemas";
import { Repository } from "typeorm";
import { Schedule } from "../entities";

type TCreateSchedule = z.infer<typeof createSchemaSchedule>;

type TReturnSchedule = z.infer<typeof returnSchemaSchedule>;

type TAllSchedule = z.infer<typeof allSchemaSchedule>;

type TRepositorySchedule = Repository<Schedule>;

export { TCreateSchedule, TReturnSchedule, TAllSchedule, TRepositorySchedule };
