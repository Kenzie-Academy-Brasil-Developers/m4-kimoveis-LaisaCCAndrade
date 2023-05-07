import { Request, Response } from "express";
import { TCreateEstate } from "../interfaces/estate.interfaces";
import createEstateService from "../services/estates/createEstates.services";
import listEstateService from "../services/estates/listEstates.services";

const createEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estateData: TCreateEstate = req.body;
  const newEstate = await createEstateService(estateData);

  return res.status(201).json(newEstate);
};

const listEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const estate = await listEstateService();

  return res.json(estate);
};

export { createEstateController, listEstateController };
