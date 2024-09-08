export class Order {
  private id: number;
  private customerName: string;
  private customerEmail: string;
  private customerPhone: string;
  private customerAddress: string;
  private productId: number;
  private quantity: number;
  private totalPrice: number;
  private status: string;

  constructor(
    id: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    customerAddress: string,
    productId: number,
    quantity: number,
    totalPrice: number,
    status: string
  ) {
    this.id = id;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.customerAddress = customerAddress;
    this.productId = productId;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.status = status;

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

  public setStatus(status: string) {
    this.status = status;
  }

  public setTotalPrice(totalPrice: number) {
    this.totalPrice = totalPrice;
  }

  public setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  public setCustomerAddress(customerAddress: string) {
    this.customerAddress = customerAddress;
  }

  public setCustomerPhone(customerPhone: string) {
    this.customerPhone = customerPhone;
  }

  public setCustomerEmail(customerEmail: string) {
    this.customerEmail = customerEmail;
  }

  public setCustomerName(customerName: string) {
    this.customerName = customerName;
  }

  public setId(id: number) {
    this.id = id;
  }

  public setProductId(productId: number) {
    this.productId = productId;
  }
}
