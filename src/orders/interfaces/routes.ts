import { Router } from "express";
import { orderController } from "../config/dependencyInjection";
import {
  createOrderValidator,
  updateOrderValidator,
} from "../validators/orderValidators";
import { validateRequest } from "../../config/validateRequest";

const orderRouter = Router();

orderRouter.post(
  "/orders",
  createOrderValidator,
  validateRequest,
  orderController.createOrder
);
orderRouter.get("/orders/:id", orderController.findOrderById);
orderRouter.get("/orders", orderController.findAllOrders);
orderRouter.put(
  "/orders/:id",
  updateOrderValidator,
  validateRequest,
  orderController.updateOrder
);
orderRouter.delete("/orders/:id", orderController.deleteOrderById);

export { orderRouter };
