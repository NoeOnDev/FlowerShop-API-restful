import { Request, Response } from "express";
import { ProductService } from "../application/ProductService";
import { CreateProductCommand } from "../application/CreateProductCommand";

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, stock, category } = req.body;
      const command = new CreateProductCommand(
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

  async findProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(Number(id));
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async findAllProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, price, stock, category } = req.body;
      const command = new CreateProductCommand(
        name,
        description,
        price,
        stock,
        category
      );
      await this.productService.updateProduct(Number(id), command);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.productService.deleteById(Number(id));
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
