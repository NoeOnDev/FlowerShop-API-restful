import { injectable, inject } from "inversify";
import { OrderRepository } from "../domain/OrderRepository";
import { CreateOrderCommand } from "./CreateOrderCommand";
import { Order } from "../domain/Order";
import { ProductRepository } from "../../catalog/domain/ProductRepository";
import { CustomError } from "../../errors/CustomError";

@injectable()
export class OrderService {
  constructor(
    @inject("OrderRepository") private orderRepository: OrderRepository,
    @inject("ProductRepository") private productRepository: ProductRepository
  ) {}

  async createOrder(command: CreateOrderCommand): Promise<void> {
    const product = await this.productRepository.findById(command.productId);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    if (product.getStock() < command.quantity) {
      throw new CustomError("Not enough stock", 400);
    }

    const totalPrice = product.getPrice() * command.quantity;
    const status = "processed";

    const order = new Order(
      0,
      command.productId,
      command.quantity,
      totalPrice,
      status,
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
    const product = await this.productRepository.findById(command.productId);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    const existingOrder = await this.orderRepository.findById(id);
    if (!existingOrder) {
      throw new CustomError("Order not found", 404);
    }

    const newQuantity = command.quantity;
    const oldQuantity = existingOrder.getQuantity();
    const stockChange = newQuantity - oldQuantity;

    if (product.getStock() < stockChange) {
      throw new CustomError("Not enough stock", 400);
    }

    const totalPrice = product.getPrice() * newQuantity;
    const status = "processed";

    const order = new Order(
      id,
      command.productId,
      newQuantity,
      totalPrice,
      status,
      command.customerName,
      command.customerEmail,
      command.customerPhone,
      command.customerAddress
    );

    await this.orderRepository.update(order);
    product.reduceStock(stockChange);
    await this.productRepository.update(product);
  }

  async deleteById(id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
  }
}
