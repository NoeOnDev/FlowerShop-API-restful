export class Order {
  private id: number;
  private productId: number;
  private quantity: number;
  private totalPrice: number;
  private status: string;
  private customerName: string;
  private customerEmail: string;
  private customerPhone: string;
  private customerAddress: string;

  constructor(
    id: number,
    productId: number,
    quantity: number,
    totalPrice: number,
    status: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    customerAddress: string
  ) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.customerAddress = customerAddress;

    this.validate();
  }

  private validate() {
    if (this.quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }
    if (this.totalPrice <= 0) {
      throw new Error("Total price must be greater than zero.");
    }
    if (!this.customerEmail.includes("@")) {
      throw new Error("Invalid email address.");
    }
  }

  public getId(): number {
    return this.id;
  }

  public getProductId(): number {
    return this.productId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getTotalPrice(): number {
    return this.totalPrice;
  }

  public getStatus(): string {
    return this.status;
  }

  public getCustomerName(): string {
    return this.customerName;
  }

  public getCustomerEmail(): string {
    return this.customerEmail;
  }

  public getCustomerPhone(): string {
    return this.customerPhone;
  }

  public getCustomerAddress(): string {
    return this.customerAddress;
  }

  public setStatus(status: string) {
    this.status = status;
  }

  public setCustomerName(customerName: string) {
    this.customerName = customerName;
  }

  public setCustomerEmail(customerEmail: string) {
    this.customerEmail = customerEmail;
  }

  public setCustomerPhone(customerPhone: string) {
    this.customerPhone = customerPhone;
  }

  public setCustomerAddress(customerAddress: string) {
    this.customerAddress = customerAddress;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  public setTotalPrice(totalPrice: number) {
    this.totalPrice = totalPrice;
  }

  public setProductId(productId: number) {
    this.productId = productId;
  }

  public setId(id: number) {
    this.id = id;
  }
}
