import { Request, Response } from "express";
import { OrderService } from "../application/OrderService";
import { CreateOrderCommand } from "../application/CreateOrderCommand";

export class OrderController {
  constructor(private orderService: OrderService) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const {
        productId,
        quantity,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
      } = req.body;
      const command = new CreateOrderCommand(
        productId,
        quantity,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress
      );
      await this.orderService.createOrder(command);
      res.status(201).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async findOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.findById(Number(id));
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).send("Order not found");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async findAllOrders(_req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        productId,
        quantity,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
      } = req.body;
      const command = new CreateOrderCommand(
        productId,
        quantity,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress
      );
      await this.orderService.updateOrder(Number(id), command);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.orderService.deleteById(Number(id));
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
