import { Product } from "./Product";

export interface ProductRepository {
  save(product: Product): void;
  findById(id: number): Product | undefined;
  findAll(): Product[];
  update(product: Product): void;
  deleteById(id: number): void;
}
