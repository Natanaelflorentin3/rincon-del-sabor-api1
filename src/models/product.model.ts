import pool from "../config/db.js";

export const getAllProducts = async (maxPrice?: number, page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;

  if (maxPrice) {
    const result = await pool.query(
      "SELECT * FROM products WHERE precio <= $1 LIMIT $2 OFFSET $3",
      [maxPrice, limit, offset]
    );
    return result.rows;
  }

  const result = await pool.query("SELECT * FROM products LIMIT $1 OFFSET $2", [limit, offset]);
  return result.rows;
};



export const getProductById = async (id: number) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const insertProduct = async (nombre: string, descripcion: string, precio: number) => {
  const result = await pool.query(
    "INSERT INTO products (nombre, descripcion, precio) VALUES ($1, $2, $3) RETURNING *",
    [nombre, descripcion, precio]
  );
  return result.rows[0];
};

export const updateProduct = async (id: number, nombre: string, descripcion: string, precio: number) => {
  const result = await pool.query(
    "UPDATE products SET nombre = $1, descripcion = $2, precio = $3 WHERE id = $4 RETURNING *",
    [nombre, descripcion, precio, id]
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};