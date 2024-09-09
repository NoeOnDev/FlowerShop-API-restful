import { Router } from "express";
import { productController } from "../config/dependencyInjection";
import {
  createProductValidator,
  updateProductValidator,
} from "../validators/productValidators";
import { validateRequest } from "../../config/validateRequest";

const productRouter = Router();

productRouter.post(
  "/products",
  createProductValidator,
  validateRequest,
  productController.createProduct
);
productRouter.get("/products/:id", productController.findProductById);
productRouter.get("/products", productController.findAllProducts);
productRouter.put(
  "/products/:id",
  updateProductValidator,
  validateRequest,
  productController.updateProduct
);
productRouter.delete("/products/:id", productController.deleteProductById);

export { productRouter };
