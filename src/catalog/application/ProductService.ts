import { ProductRepository } from "../domain/ProductRepository";
import { CreateProductCommand } from "./CreateProductCommand";
import { Product } from "../domain/Product";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  createProduct(command: CreateProductCommand): void {
    const product = new Product(
      command.id,
      command.name,
      command.description,
      command.price,
      command.stock,
      command.category
    );
    this.productRepository.save(product);
  }
}
