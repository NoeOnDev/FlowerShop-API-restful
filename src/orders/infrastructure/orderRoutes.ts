import { Router } from "express";
import { orderController } from "./dependencyInjection";
import {
  createOrderValidator,
  updateOrderValidator,
} from "./validators/orderValidators";
import { validateRequest } from "../../errors/validateRequest";

const orderRouter = Router();

orderRouter.post(
  "/orders",
  createOrderValidator,
  validateRequest,
  orderController.createOrder.bind(orderController)
);
orderRouter.get(
  "/orders/:id",
  orderController.findOrderById.bind(orderController)
);
orderRouter.get("/orders", orderController.findAllOrders.bind(orderController));
orderRouter.put(
  "/orders/:id",
  updateOrderValidator,
  validateRequest,
  orderController.updateOrder.bind(orderController)
);
orderRouter.delete(
  "/orders/:id",
  orderController.deleteOrderById.bind(orderController)
);

export { orderRouter };
