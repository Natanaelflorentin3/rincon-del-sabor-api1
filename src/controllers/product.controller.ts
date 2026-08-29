import type { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct as updateProductModel,
} from "../models/product.model.js";

export const getMenu = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Obtiene la lista completa de productos' */
  try {
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const products = await getAllProducts(maxPrice, page, limit);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el menú" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Obtiene un producto por su id' */
  try {
    const id = Number(req.params.id);
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ error: `No se encontró un producto con id ${id}.` });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Crea un nuevo producto' */
  try {
    const { nombre, descripcion, precio } = req.body;
    const newProduct = await insertProduct(nombre, descripcion, precio);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Actualiza un producto existente' */
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion, precio } = req.body;
    const updated = await updateProductModel(id, nombre, descripcion, precio);

    if (!updated) {
      return res.status(404).json({ error: `No se encontró un producto con id ${id}.` });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};