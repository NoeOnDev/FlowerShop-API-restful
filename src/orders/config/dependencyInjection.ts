import {pool} from "../../config/dbConnection";
import { PostgresOrderRepository } from "../infrastructure/PostgresOrderRepository";
import { OrderController } from "../interfaces/OrderController";
import { OrderService } from "../application/OrderService";
import { PostgresProductRepository } from "../../catalog/infrastructure/PostgresProductRepository";

const orderRepository = new PostgresOrderRepository(pool);
const productRepository = new PostgresProductRepository(pool);
const orderService = new OrderService(orderRepository, productRepository);
const orderController = new OrderController(orderService);

export { orderController };
