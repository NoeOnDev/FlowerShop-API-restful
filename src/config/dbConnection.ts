import { Pool } from "pg";
import { envConfig } from "./env.config";

const pool = new Pool({
  user: envConfig.db.user!,
  host: envConfig.db.host!,
  database: envConfig.db.name!,
  password: envConfig.db.pass!,
  port: parseInt(envConfig.db.port!),
});

const createTables = async () => {
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
      stock INT NOT NULL CHECK (stock >= 0),
      category VARCHAR(255)
    );
  `;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      product_id INT NOT NULL REFERENCES products(id),
      quantity INT NOT NULL CHECK (quantity > 0),
      total_price NUMERIC(10, 2) NOT NULL CHECK (total_price > 0),
      status VARCHAR(50) NOT NULL DEFAULT 'processed',
      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255) NOT NULL,
      customer_phone VARCHAR(50) NOT NULL,
      customer_address TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createProductsTable);
    await pool.query(createOrdersTable);
    console.log("Tables created or already exist");
  } catch (err) {
    console.error("Error creating tables", err);
  }
};

export { pool, createTables };
