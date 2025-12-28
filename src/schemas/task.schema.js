import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Titulo requerido",
  }),
  description: z.string({
    required_error: "La descripción debe ser un texto",
  }),
  date: z.string().datetime().optional(),
});
