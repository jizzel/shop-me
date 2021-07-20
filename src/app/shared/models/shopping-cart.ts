import {ShoppingCartItem} from './shopping-cart-items';
import {Product} from './products';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private readonly itemsMap: {[key: string]: ShoppingCartItem}) {
    this.itemsMap = itemsMap || {};
    for(const productId in itemsMap) {
      const item = itemsMap[productId];
      // const x = new ShoppingCartItem({
        // title: item.title,
        // imageUrl: item.imageUrl,
        // price: item.price,
        // $key: productId
      // });
      // Object.assign(x, item);
      // x.$key = productId;
      this.items.push(new ShoppingCartItem({...item, $key: productId}));
    }
  }
  get totalItemCount(){
    let count = 0;
    for(const productId in this.items)
      count += this.items[productId].quantity;
    return count;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items)
      sum += this.items[productId].totalPrice;
    return sum;
  }

  getQuantity(product: Product) {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }
}
