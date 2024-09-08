import { Order } from "./Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: number): Promise<Order | undefined>;
  findAll(): Promise<Order[]>;
  update(order: Order): Promise<void>;
  deleteById(id: number): Promise<void>;
}
