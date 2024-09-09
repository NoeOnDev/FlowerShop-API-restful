export class Product {
  private id: number;
  private name: string;
  private description: string;
  private price: number;
  private stock: number;
  private category: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;

    this.validate();
  }

  private validate() {
    if (this.price <= 0) {
      throw new Error("The price must be greater than zero.");
    }
    if (this.stock < 0) {
      throw new Error("Stock cannot be negative.");
    }
  }

  public reduceStock(quantity: number) {
    if (this.stock < quantity) {
      throw new Error("Insufficient stock.");
    }
    this.stock -= quantity;
  }

  public increaseStock(quantity: number) {
    this.stock += quantity;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPrice(): number {
    return this.price;
  }

  public getStock(): number {
    return this.stock;
  }

  public getCategory(): string {
    return this.category;
  }

  public setId(id: number): void {
    this.id = id;
  }
}
