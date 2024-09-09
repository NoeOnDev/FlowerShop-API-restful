export class CreateOrderCommand {
  constructor(
    public readonly productId: number,
    public readonly quantity: number,
    public readonly customerName: string,
    public readonly customerEmail: string,
    public readonly customerPhone: string,
    public readonly customerAddress: string
  ) {}
}
