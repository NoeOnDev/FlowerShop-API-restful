import { Request, Response } from "express";
import { ProductService } from "../application/ProductService";
import { CreateProductCommand } from "../application/CreateProductCommand";

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id, name, description, price, stock, category } = req.body;
      const command = new CreateProductCommand(
        id,
        name,
        description,
        price,
        stock,
        category
      );
      await this.productService.createProduct(command);
      res.status(201).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
