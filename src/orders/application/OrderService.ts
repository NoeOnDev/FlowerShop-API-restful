import { OrderRepository } from "../domain/OrderRepository";
import { CreateOrderCommand } from "./CreateOrderCommand";
import { Order } from "../domain/Order";
import { ProductRepository } from "../../catalog/domain/ProductRepository";

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {}

  async createOrder(command: CreateOrderCommand): Promise<void> {
    const product = await this.productRepository.findById(command.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (product.getStock() < command.quantity) {
      throw new Error("Insufficient stock");
    }

    const order = new Order(
      0,
      command.productId,
      command.quantity,
      command.totalPrice,
      command.status,
      command.customerName,
      command.customerEmail,
      command.customerPhone,
      command.customerAddress
    );

    await this.orderRepository.save(order);
    product.reduceStock(command.quantity);
    await this.productRepository.update(product);
  }

  async findById(id: number): Promise<Order | undefined> {
    return this.orderRepository.findById(id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async updateOrder(id: number, command: CreateOrderCommand): Promise<void> {
    const order = new Order(
      id,
      command.productId,
      command.quantity,
      command.totalPrice,
      command.status,
      command.customerName,
      command.customerEmail,
      command.customerPhone,
      command.customerAddress
    );
    await this.orderRepository.update(order);
  }

  async deleteById(id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
