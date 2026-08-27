import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const productSchema = z.object({
  nombre: z.string().min(1, "El nombre no puede estar vacío"),
  descripcion: z.string().min(1, "La descripción no puede estar vacía"),
  precio: z.number().positive("El precio debe ser mayor a cero"),
});

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }

  next();
};