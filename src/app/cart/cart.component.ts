import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CartService } from '../cart.service';
import { Article, Cart, Order, User } from '../interface';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../orderService.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  articleCart: Article[] = [];
  totalPrice = signal(0);
  totalPaid = 0;

  user: User = {
    '@id': '',
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    picture: '',
    adresse: '',
    orders: [], // TODO: change to OrderArticle[]
  };
  cart: Cart = {
    id: 0,
    article: [],
    prestation: [],
    quantity: 0,
    priceHT: 0,
    priceTTC: 0,
    TVA: 0,
  };

  private router: Router = inject(Router);

  private authService: AuthService = inject(AuthService);

  private cartService: CartService = inject(CartService);

  private userService: UserService = inject(UserService);

  private orderService: OrderService = inject(OrderService);

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit(): void {
    this.showCart();
    this.getUser();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
  }
  getUser() {
    this.userService.getUserById().subscribe((data: User) => {
      this.user = data;
      //console.log(this.user);
    });
  }

  showCart() {
    this.cartService
      .getCartItems()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((articleCart: Article[]) => {
        this.articleCart = articleCart;

        this.updateTotalPrice();
      });
  }

  deleteItem(item: Article) {
    this.cartService.removeFromCart(item);
    this.showCart();
  }

  incrementQuantity(item: Article) {
    this.cartService.incrementQuantity(item);
    this.updateTotalPrice();
  }

  decrementQuantity(item: Article) {
    this.cartService.decrementQuantity(item);
    if (item.quantity <= 0) {
      item.quantity = 0;
      this.deleteItem(item);
    }
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const newTotal = this.articleCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.totalPrice.set(newTotal);
    this.totalPaid = this.totalPrice();
  }

  calculateItemTotalPrice(article: Article): number {
    return article.price * article.quantity;
  }

  OnSubmit() {
    if(this.totalPaid == 0){
      alert("Please add some items to your cart");
      return;
    } else if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
    } else {
    let orderArticle: string[] = [];
    this.articleCart.forEach((article) => {
      orderArticle.push(article['@id']);
    });

    const newOrder: Order = {
      client: this.user['@id'],
      statut: ['pending'],
      total: this.totalPaid,
      article_commande: orderArticle,
    };

    this.orderService.createOrder(newOrder).subscribe(
      (response) => {
        // console.log('Order created successfully:', response);
        // console.log(newOrder);
        this.router.navigate(['profil']);
      },
      (error) => {
        // console.error('Error creating order:', error);
        // console.log(newOrder);
        this.router.navigate(['login']);
      }
    );
  }
}
}
