import { z } from "zod";
import {
  allSchemaCategory,
  createSchemaCategory,
  returnSchemaCategory,
} from "../schemas/categories.schemas";
import { Repository } from "typeorm";
import { Category } from "../entities";

type TCreateCategory = z.infer<typeof createSchemaCategory>;

type TReturnCategory = z.infer<typeof returnSchemaCategory>;

type TAllCategory = z.infer<typeof allSchemaCategory>;

type TRepositoryCategory = Repository<Category>;

export { TCreateCategory, TReturnCategory, TAllCategory, TRepositoryCategory };
