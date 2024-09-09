import { Router } from "express";
import { orderController } from "../config/dependencyInjection";

const orderRouter = Router();

orderRouter.post("/orders", (req, res) =>
  orderController.createOrder(req, res)
);
orderRouter.get("/orders/:id", (req, res) =>
  orderController.findOrderById(req, res)
);
orderRouter.get("/orders", (req, res) =>
  orderController.findAllOrders(req, res)
);
orderRouter.put("/orders/:id", (req, res) =>
  orderController.updateOrder(req, res)
);
orderRouter.delete("/orders/:id", (req, res) =>
  orderController.deleteOrderById(req, res)
);

export { orderRouter };
