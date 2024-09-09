import { Router } from "express";
import { orderController } from "../config/dependencyInjection";

const orderRouter = Router();

orderRouter.post("/orders", (req, res, next) =>
  orderController.createOrder(req, res, next)
);
orderRouter.get("/orders/:id", (req, res, next) =>
  orderController.findOrderById(req, res, next)
);
orderRouter.get("/orders", (req, res, next) =>
  orderController.findAllOrders(req, res, next)
);
orderRouter.put("/orders/:id", (req, res, next) =>
  orderController.updateOrder(req, res, next)
);
orderRouter.delete("/orders/:id", (req, res, next) =>
  orderController.deleteOrderById(req, res, next)
);

export { orderRouter };
