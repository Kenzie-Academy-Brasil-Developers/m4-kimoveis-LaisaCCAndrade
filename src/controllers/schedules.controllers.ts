import { Request, Response } from "express";
import { TCreateSchedule } from "../interfaces/schedules.interfaces";
import createSchedulesService from "../services/schedules/createSchedules.services";
import retrieveSchedulesService from "../services/schedules/retrieveSchedules.services";

const createSchedulesController = async (req: Request, res: Response) => {
  const scheduleData: TCreateSchedule = req.body;
  const userId: number = req.user.id;
  const schedule = await createSchedulesService(scheduleData, userId);

  return res.status(201).json(schedule);
};

const retrieveSchedulesController = async (req: Request, res: Response) => {
  const estateId: number = parseInt(req.params.body);
  const schedules = await retrieveSchedulesService(estateId);

  return res.json(schedules);
};

export { createSchedulesController, retrieveSchedulesController };
