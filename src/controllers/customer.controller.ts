import type { Request, Response } from "express";
import {
  getAllCustomers,
  getCustomerById,
  insertCustomer,
  updateCustomer as updateCustomerModel,
} from "../models/customer.model.js";

export const getCustomers = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Obtiene la lista completa de clientes' */
  try {
    const customers = await getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Obtiene un cliente por su id' */
  try {
    const id = Number(req.params.id);
    const customer = await getCustomerById(id);

    if (!customer) {
      return res.status(404).json({ error: `No se encontró un cliente con id ${id}.` });
    }

    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Crea un nuevo cliente' */
  try {
    const { nombre, email, numero_celular } = req.body;
    const newCustomer = await insertCustomer(nombre, email, numero_celular);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  /*#swagger.tags = ['Customers']
    #swagger.summary = 'Actualiza un cliente existente' */
  try {
    const id = Number(req.params.id);
    const { nombre, email, numero_celular } = req.body;
    const updated = await updateCustomerModel(id, nombre, email, numero_celular);

    if (!updated) {
      return res.status(404).json({ error: `No se encontró un cliente con id ${id}.` });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};