import { Container } from "inversify";
import { pool } from "./dbConnection";
import { ProductRepository } from "../catalog/domain/ProductRepository";
import { OrderRepository } from "../orders/domain/OrderRepository";
import { PostgresOrderRepository } from "../orders/infrastructure/PostgresOrderRepository";
import { PostgresProductRepository } from "../catalog/infrastructure/PostgresProductRepository";
import { OrderService } from "../orders/application/OrderService";
import { ProductService } from "../catalog/application/ProductService";
import { OrderController } from "../orders/infrastructure/OrderController";
import { ProductController } from "../catalog/infrastructure/ProductController";

const container = new Container();

container
  .bind<ProductRepository>("ProductRepository")
  .toDynamicValue(() => new PostgresProductRepository(pool));
container
  .bind<OrderRepository>("OrderRepository")
  .toDynamicValue(() => new PostgresOrderRepository(pool));

container.bind<OrderService>(OrderService).toDynamicValue((context) => {
  return new OrderService(
    context.container.get("OrderRepository"),
    context.container.get("ProductRepository")
  );
});
container.bind<ProductService>(ProductService).toDynamicValue((context) => {
  return new ProductService(context.container.get("ProductRepository"));
});

container.bind<OrderController>(OrderController).toDynamicValue((context) => {
  return new OrderController(context.container.get(OrderService));
});
container
  .bind<ProductController>(ProductController)
  .toDynamicValue((context) => {
    return new ProductController(context.container.get(ProductService));
  });

export { container };
