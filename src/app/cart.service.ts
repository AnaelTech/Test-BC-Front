import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Article } from './interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  addToCart(item: any) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
  }

  getCartItems() {
    return of(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  incrementQuantity(item: Article) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.quantity++;
    }
  }

  decrementQuantity(item: Article) {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItem) {
      existingItem.quantity--;
    }
  }
}
