import { ProductRepository } from "../domain/ProductRepository";
import { CreateProductCommand } from "./CreateProductCommand";
import { Product } from "../domain/Product";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(command: CreateProductCommand): Promise<void> {
    const product = new Product(
      command.id,
      command.name,
      command.description,
      command.price,
      command.stock,
      command.category
    );
    await this.productRepository.save(product);
  }
}
