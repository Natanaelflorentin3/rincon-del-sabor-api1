import pool from "../config/db.js";

export const getAllCustomers = async () => {
  const result = await pool.query("SELECT * FROM customers");
  return result.rows;
};

export const getCustomerById = async (id: number) => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const insertCustomer = async (nombre: string, email: string, numero_celular: string) => {
  const result = await pool.query(
    "INSERT INTO customers (nombre, email, numero_celular) VALUES ($1, $2, $3) RETURNING *",
    [nombre, email, numero_celular]
  );
  return result.rows[0];
};

export const updateCustomer = async (id: number, nombre: string, email: string, numero_celular: string) => {
  const result = await pool.query(
    "UPDATE customers SET nombre = $1, email = $2, numero_celular = $3 WHERE id = $4 RETURNING *",
    [nombre, email, numero_celular, id]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};