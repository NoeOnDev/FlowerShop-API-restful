import { injectable, inject } from "inversify";
import { ProductRepository } from "../domain/ProductRepository";
import { CreateProductCommand } from "./CreateProductCommand";
import { Product } from "../domain/Product";
import { CustomError } from "../../errors/CustomError";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductRepository") private productRepository: ProductRepository
  ) {}

  async createProduct(command: CreateProductCommand): Promise<void> {
    const existingProduct = await this.productRepository.findByName(
      command.name
    );
    if (existingProduct) {
      throw new CustomError("Product already exists", 400);
    }
    const product = new Product(
      0,
      command.name,
      command.description,
      command.price,
      command.stock,
      command.category
    );
    await this.productRepository.save(product);
  }

  async findById(id: number): Promise<Product | undefined> {
    return this.productRepository.findById(id);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async updateProduct(
    id: number,
    command: CreateProductCommand
  ): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    const updatedProduct = new Product(
      id,
      command.name,
      command.description,
      command.price,
      command.stock,
      command.category
    );
    await this.productRepository.update(updatedProduct);
  }

  async deleteById(id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
