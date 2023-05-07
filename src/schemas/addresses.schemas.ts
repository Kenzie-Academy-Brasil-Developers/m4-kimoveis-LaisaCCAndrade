import { z } from "zod";

const createSchemaAddress = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().nullish(),
  city: z.string(),
  state: z.string().max(2),
});

const returnSchemaAddress = createSchemaAddress.extend({
  id: z.number(),
});

export { createSchemaAddress, returnSchemaAddress };
