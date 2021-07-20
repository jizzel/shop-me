
export class ShoppingCartItem {
  constructor(init: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  $key: string;

  get totalPrice() { return this.price * this.quantity; }
}
