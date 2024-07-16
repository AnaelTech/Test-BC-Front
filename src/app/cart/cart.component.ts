import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Article, Cart } from '../interface';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { OrderService } from '../orderService.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  articleCart: Article[] = [];
  cart: Cart = {
    id: 0,
    article: [],
    prestation: [],
    quantity: 0,
    priceHT: 0,
    priceTTC: 0,
    TVA: 0,
  };
  cartService: CartService = inject(CartService);

  private orderService: OrderService = inject(OrderService);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.showCart();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
  }

  showCart() {
    this.cartService
      .getCartItems()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((articleCart: Article[]) => {
        this.articleCart = articleCart;
      });
  }

  deleteItem(item: Article) {
    this.cartService.removeFromCart(item);
    this.showCart();
  }

  incrementQuantity(item: Article) {
    this.cartService.incrementQuantity(item);
  }

  decrementQuantity(item: Article) {
    this.cartService.decrementQuantity(item);
    if (item.quantity <= 0) {
      item.quantity = 0;
    }
  }

  incrementPriceArticle(item: Article) {
    this.cartService.incrementPriceArticle(item);
  }

  // OnSubmit() {
  //   this.cartService.getCartItems().subscribe((cartItems: Article[]) => {
  //     this.orderService.createOrder(cartItems);
  //   });
  // }
}
