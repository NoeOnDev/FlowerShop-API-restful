import { injectable } from "inversify";
import { Pool } from "pg";
import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/OrderRepository";

@injectable()
export class PostgresOrderRepository implements OrderRepository {
  constructor(private pool: Pool) {}

  async save(order: Order): Promise<void> {
    const query = `
        INSERT INTO orders (product_id, quantity, total_price, status, customer_name, customer_email, customer_phone, customer_address)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id;
      `;
    const values = [
      order.getProductId(),
      order.getQuantity(),
      order.getTotalPrice(),
      order.getStatus(),
      order.getCustomerName(),
      order.getCustomerEmail(),
      order.getCustomerPhone(),
      order.getCustomerAddress(),
    ];
    const result = await this.pool.query(query, values);
    order.setId(result.rows[0].id);
  }

  async findById(id: number): Promise<Order | undefined> {
    const query = "SELECT * FROM orders WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      return undefined;
    }
    const row = result.rows[0];
    return new Order(
      row.id,
      row.product_id,
      row.quantity,
      row.total_price,
      row.status,
      row.customer_name,
      row.customer_email,
      row.customer_phone,
      row.customer_address
    );
  }

  async findAll(): Promise<Order[]> {
    const query = "SELECT * FROM orders";
    const result = await this.pool.query(query);
    return result.rows.map(
      (row) =>
        new Order(
          row.id,
          row.product_id,
          row.quantity,
          row.total_price,
          row.status,
          row.customer_name,
          row.customer_email,
          row.customer_phone,
          row.customer_address
        )
    );
  }

  async update(order: Order): Promise<void> {
    const query = `
        UPDATE orders
        SET product_id = $2,
            quantity = $3,
            total_price = $4,
            status = $5,
            customer_name = $6,
            customer_email = $7,
            customer_phone = $8,
            customer_address = $9
        WHERE id = $1;
      `;
    const values = [
      order.getId(),
      order.getProductId(),
      order.getQuantity(),
      order.getTotalPrice(),
      order.getStatus(),
      order.getCustomerName(),
      order.getCustomerEmail(),
      order.getCustomerPhone(),
      order.getCustomerAddress(),
    ];
    await this.pool.query(query, values);
  }

  async deleteById(id: number): Promise<void> {
    const query = "DELETE FROM orders WHERE id = $1";
    await this.pool.query(query, [id]);
  }
}
