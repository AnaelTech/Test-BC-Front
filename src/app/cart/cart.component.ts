import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Article, Cart } from '../interface';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  articleCart: Article[] = [];
  cartService: CartService = inject(CartService);

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
}
