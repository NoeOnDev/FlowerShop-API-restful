import { Request, Response, NextFunction } from "express";
import { injectable, inject } from "inversify";
import { OrderService } from "../application/OrderService";
import { CreateOrderCommand } from "../application/CreateOrderCommand";
import { CustomError } from "../../errors/CustomError";

@injectable()
export class OrderController {
  constructor(@inject(OrderService) private orderService: OrderService) {}

  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }

  async findOrderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.findById(Number(id));
      if (order) {
        res.status(200).json(order);
      } else {
        next(new CustomError("Order not found", 404));
      }
    } catch (error) {
      next(error);
    }
  }

  async findAllOrders(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const orders = await this.orderService.findAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }

  async deleteOrderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await this.orderService.deleteById(Number(id));
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
