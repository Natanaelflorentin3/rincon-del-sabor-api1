import type { Request, Response } from "express";
import { getAllSales, getSaleById, insertSale } from "../models/sale.model.js";

export const getSales = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtiene todas las ventas con el nombre del cliente' */
  try {
    const sales = await getAllSales();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
};

export const getSale = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtiene una venta por su id' */
  try {
    const id = Number(req.params.id);
    const sale = await getSaleById(id);

    if (!sale) {
      return res.status(404).json({ error: `No se encontró una venta con id ${id}.` });
    }

    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la venta" });
  }
};

export const createSale = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Crea una nueva venta' */
  try {
    const { fecha_venta, id_cliente } = req.body;
    const newSale = await insertSale(fecha_venta, id_cliente);
    res.status(201).json(newSale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la venta" });
  }
};

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