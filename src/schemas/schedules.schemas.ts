import { z } from "zod";
import { returnSchemaEstate } from "./estate.schemas";
import { returnSchema } from "./users.schemas";

const createSchemaSchedule = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnSchemaSchedule = createSchemaSchedule.extend({
  id: z.number(),
  userId: z.number(),
});

const allSchemaSchedule = returnSchemaSchedule
  .extend({
    realEstate: returnSchemaEstate,
    user: returnSchema,
  })
  .omit({
    realEstateId: true,
  });

export { createSchemaSchedule, returnSchemaSchedule, allSchemaSchedule };
