import { Router } from "express";
import { productController } from "../dependencyInjection";
import {
  createProductValidator,
  updateProductValidator,
} from "../validators/productValidators";
import { validateRequest } from "../../../errors/validateRequest";

const productRouter = Router();

productRouter.post(
  "/products",
  createProductValidator,
  validateRequest,
  productController.createProduct.bind(productController)
);
productRouter.get(
  "/products/:id",
  productController.findProductById.bind(productController)
);
productRouter.get(
  "/products",
  productController.findAllProducts.bind(productController)
);
productRouter.put(
  "/products/:id",
  updateProductValidator,
  validateRequest,
  productController.updateProduct.bind(productController)
);
productRouter.delete(
  "/products/:id",
  productController.deleteProductById.bind(productController)
);

export { productRouter };
