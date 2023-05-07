import { z } from "zod";

const createSchemaCategory = z.object({
  name: z.string(),
});

const returnSchemaCategory = createSchemaCategory.extend({
  id: z.number(),
});

const allSchemaCategory = returnSchemaCategory.array();

export { createSchemaCategory, returnSchemaCategory, allSchemaCategory };
