import { z } from "zod";
import { createSchemaAddress, returnSchemaAddress } from "./addresses.schemas";
import { returnSchemaCategory } from "./categories.schemas";

const createSchemaEstate = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  sold: z.boolean().optional().default(false),
  categoryId: z.number().optional().nullish(),
  address: createSchemaAddress,
});

const returnSchemaEstate = createSchemaEstate
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: returnSchemaAddress,
    category: returnSchemaCategory,
  })
  .omit({ categoryId: true });

const allSchemaEstate = returnSchemaEstate
  .omit({
    category: true,
  })
  .array();

export { createSchemaEstate, returnSchemaEstate, allSchemaEstate };
