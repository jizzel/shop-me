import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../shared/models/products';
import 'rxjs/add/operator/switchMap';
import {ShoppingCartService} from '../../../shared/services/shopping-cart.service';
import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService,
    private productService: ProductService) {

  }

  async ngOnInit() {
    this.populateProducts();
    this.cart$ = await this.shoppingCartService.getCart();
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

  private populateProducts() {
    this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

}
