import { z } from "zod";
import {
  allSchema,
  createSchema,
  returnSchema,
} from "../schemas/users.schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type TCreate = z.infer<typeof createSchema>;

type TReturn = z.infer<typeof returnSchema>;

type TAll = z.infer<typeof allSchema>;

type TUpdate = DeepPartial<TCreate>;

type TRepository = Repository<User>;

export { TCreate, TReturn, TAll, TUpdate, TRepository };
