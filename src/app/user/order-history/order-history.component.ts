import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';
import { Article, Order, User } from '../../interface';
import { ArticleService } from '../../article/article.service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  private userService: UserService = inject(UserService);
  public user: User = {
    '@id': '',
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    picture: '',
    adresse: '',
    orders: [
      {
        id: 0,
        client: '',
        statut: [],
        total: 0,
        article_commande: [
          {
            '@id': '',
            '@type': '',
            id: 0,
            name: '',
            description: '',
            picture: '',
            category: {
              '@id': '',
              '@type': '',
              id: 0,
              name: '',
              parent: '',
              children: [],
              Prestation: [],
            },
            quantity: 0,
            price: 0,
            prestations: [],
          },
        ],
        employee: '',
      },
    ], // TODO: change to OrderArticle[]
  };

  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUserById().subscribe((data: User) => {
      this.user = data;
      console.log(this.user.orders);
    });
  }

  trackByOrderId(index: number, order: Order): number {
    return order.id!;
  }

  trackByArticle(index: number, article: string | Article): string | number {
    return typeof article === 'string' ? article : article.id || 0;
  }

  isArticle(article: string | Article): article is Article {
    return (article as Article).name !== undefined;
  }
}
