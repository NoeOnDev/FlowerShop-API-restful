import { Product } from "./Product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: number): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<void>;
  deleteById(id: number): Promise<void>;
}
