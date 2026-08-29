import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const customerSchema = z.object({
  nombre: z.string().min(1, "El nombre no puede estar vacío"),
  email: z.string().email("El email no es válido"),
  numero_celular: z.string().min(1, "El número de celular no puede estar vacío"),
});

export const validateCustomer = (req: Request, res: Response, next: NextFunction) => {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  next();
};