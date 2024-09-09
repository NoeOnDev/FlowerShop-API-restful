import { container } from "./inversify.config";
import { OrderController } from "../orders/infrastructure/OrderController";
import { ProductController } from "../catalog/infrastructure/ProductController";

const orderController = container.get<OrderController>(OrderController);
const productController = container.get<ProductController>(ProductController);

export { orderController, productController };
