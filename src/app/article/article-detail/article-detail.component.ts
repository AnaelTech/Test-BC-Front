import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart.service';
import { Prestation, Category } from '../../interface';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit {
  private articleService: ArticleService = inject(ArticleService);
  private cartService: CartService = inject(CartService);
  public prestations: Prestation[] = [];
  public category: Category[] = [];
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  article = {
    id: 0,
    name: '',
    description: '',
    picture: '',
    category: '',
    price: 0,
  };

  constructor() {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.articleService.getArticle(id).subscribe((article: any) => {
      this.article = article;
      console.log(this.article);
      this.articleService
        .getOriginCategory(this.article.category)
        .subscribe((category: any) => {
          this.category = category;
          const prestationIds = category.Prestation;

          prestationIds.forEach((id: string) => {
            this.articleService
              .getOriginPrestation(id)
              .subscribe((prestation: any) => {
                this.prestations.push(prestation);
              });
          });
        });
    });
  }

  addToCart(id: number) {
    this.cartService.addToCart(this.article);
    this.router.navigate(['/cart']);
  }
}
