import { Pool } from "pg";
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class PostgresProductRepository implements ProductRepository {
  constructor(private pool: Pool) {}

  async save(product: Product): Promise<void> {
    const query = `
      INSERT INTO products (name, description, price, stock, category)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const values = [
      product.getName(),
      product.getDescription(),
      product.getPrice(),
      product.getStock(),
      product.getCategory(),
    ];
    const result = await this.pool.query(query, values);
    product.setId(result.rows[0].id);
  }

  async findById(id: number): Promise<Product | undefined> {
    const query = "SELECT * FROM products WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return undefined;
    }
    const row = result.rows[0];
    return new Product(
      row.id,
      row.name,
      row.description,
      row.price,
      row.stock,
      row.category
    );
  }

  async findAll(): Promise<Product[]> {
    const query = "SELECT * FROM products";
    const result = await this.pool.query(query);
    return result.rows.map(
      (row) =>
        new Product(
          row.id,
          row.name,
          row.description,
          row.price,
          row.stock,
          row.category
        )
    );
  }

  async update(product: Product): Promise<void> {
    const query = `
      UPDATE products
      SET name = $2,
          description = $3,
          price = $4,
          stock = $5,
          category = $6
      WHERE id = $1;
    `;
    const values = [
      product.getId(),
      product.getName(),
      product.getDescription(),
      product.getPrice(),
      product.getStock(),
      product.getCategory(),
    ];
    await this.pool.query(query, values);
  }

  async deleteById(id: number): Promise<void> {
    const query = "DELETE FROM products WHERE id = $1";
    await this.pool.query(query, [id]);
  }
}
