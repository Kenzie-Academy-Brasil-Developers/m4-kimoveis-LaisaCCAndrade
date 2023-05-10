import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.services";
import retrieveSchedulesService from "../services/schedules/retrieveSchedules.services";

const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = res.locals.user.id;
  const schedule = await createSchedulesService(req.body, userId);

  return res.status(201).json(schedule);
};

const retrieveSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estateId: number = parseInt(req.params.id);
  const schedules = await retrieveSchedulesService(estateId);

  return res.json(schedules);
};

export { createSchedulesController, retrieveSchedulesController };
