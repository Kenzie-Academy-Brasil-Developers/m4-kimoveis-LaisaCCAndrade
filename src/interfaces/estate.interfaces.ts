import { z } from "zod";
import {
  allSchemaEstate,
  createSchemaEstate,
  returnSchemaEstate,
} from "../schemas/estate.schemas";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";

type TCreateEstate = z.infer<typeof createSchemaEstate>;

type TReturnEstate = z.infer<typeof returnSchemaEstate>;

type TAllEstate = z.infer<typeof allSchemaEstate>;

type TRepositoryEstate = Repository<RealEstate>;

export { TCreateEstate, TReturnEstate, TAllEstate, TRepositoryEstate };
