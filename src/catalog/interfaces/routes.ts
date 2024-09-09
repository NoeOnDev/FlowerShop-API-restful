import { Router } from "express";
import { productController } from "../config/dependencyInjection";

const productRouter = Router();

productRouter.post("/products", (req, res, next) =>
  productController.createProduct(req, res, next)
);
productRouter.get("/products/:id", (req, res, next) =>
  productController.findProductById(req, res, next)
);
productRouter.get("/products", (req, res, next) =>
  productController.findAllProducts(req, res, next)
);
productRouter.put("/products/:id", (req, res, next) =>
  productController.updateProduct(req, res, next)
);
productRouter.delete("/products/:id", (req, res, next) =>
  productController.deleteProductById(req, res, next)
);

export { productRouter };
