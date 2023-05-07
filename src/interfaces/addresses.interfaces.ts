import { z } from "zod";
import {
  createSchemaAddress,
  returnSchemaAddress,
} from "../schemas/addresses.schemas";
import { DeepPartial, Repository } from "typeorm";
import { Address } from "../entities";

type TCreateAddress = z.infer<typeof returnSchemaAddress>;

type TReturnAddress = DeepPartial<z.infer<typeof createSchemaAddress>>;

type TRepositoryAddress = Repository<Address>;

export { TCreateAddress, TReturnAddress, TRepositoryAddress };
