import { pool } from "../../config/dbConnection";
import { PostgresProductRepository } from "../infrastructure/PostgresProductRepository";
import { ProductService } from "../application/ProductService";
import { ProductController } from "./ProductController";

const productRepository = new PostgresProductRepository(pool);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

export { productController };
