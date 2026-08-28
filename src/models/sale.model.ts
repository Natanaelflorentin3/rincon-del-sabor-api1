import pool from "../config/db.js";

export const getAllSales = async () => {
  const result = await pool.query(
    `SELECT sales.id, sales.fecha_venta, sales.id_cliente, customers.nombre AS nombre_cliente
     FROM sales
     INNER JOIN customers ON sales.id_cliente = customers.id`
  );
  return result.rows;
};

export const getSaleById = async (id: number) => {
  const result = await pool.query(
    `SELECT sales.id, sales.fecha_venta, sales.id_cliente, customers.nombre AS nombre_cliente
     FROM sales
     INNER JOIN customers ON sales.id_cliente = customers.id
     WHERE sales.id = $1`,
    [id]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const insertSale = async (fecha_venta: string, id_cliente: number) => {
  const result = await pool.query(
    "INSERT INTO sales (fecha_venta, id_cliente) VALUES ($1, $2) RETURNING *",
    [fecha_venta, id_cliente]
  );
  return result.rows[0];
};