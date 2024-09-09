import { Router } from "express";
import { productController } from "../config/dependencyInjection";

const productRouter = Router();

productRouter.post("/products", (req, res, next) =>
  productController.createProduct(req, res, next)
);
productRouter.get("/products/:id", (req, res) =>
  productController.findProductById(req, res)
);
productRouter.get("/products", (req, res) =>
  productController.findAllProducts(req, res)
);
productRouter.put("/products/:id", (req, res, next) =>
  productController.updateProduct(req, res, next)
);
productRouter.delete("/products/:id", (req, res) =>
  productController.deleteProductById(req, res)
);

export { productRouter };
