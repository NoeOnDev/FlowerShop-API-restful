import { Request, Response, NextFunction } from "express";
import { ProductService } from "../application/ProductService";
import { CreateProductCommand } from "../application/CreateProductCommand";
import { CustomError } from "../../errors/CustomError";

export class ProductController {
  constructor(private productService: ProductService) {}

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }

  async findProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.findById(Number(id));
      if (!product) {
        throw new CustomError("Product not found", 404);
      }
      res.status(200).json(product);
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

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
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
