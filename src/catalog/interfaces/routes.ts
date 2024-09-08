import { Router } from "express";
import { productController } from "../config/dependencyInjection";

const productRouter = Router();

productRouter.post("/products", (req, res) =>
  productController.createProduct(req, res)
);
productRouter.get("/products/:id", (req, res) =>
  productController.findProductById(req, res)
);
productRouter.get("/products", (req, res) =>
  productController.findAllProducts(req, res)
);
productRouter.put("/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);
productRouter.delete("/products/:id", (req, res) =>
  productController.deleteProductById(req, res)
);

export { productRouter };