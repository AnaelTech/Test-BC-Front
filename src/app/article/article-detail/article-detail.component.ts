import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { PrestationService } from '../../prestation/prestation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit {
  private articleService: ArticleService = inject(ArticleService);
  // private prestationService: PrestationService = inject(PrestationService);
  private cartService: CartService = inject(CartService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  article = {
    id: 0,
    name: '',
    description: '',
    picture: '',
    category: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.articleService.getArticle(id).subscribe((article: any) => {
      this.article = article;
    });
  }

  addToCart(id: number) {
    this.cartService.addToCart(this.article);
    this.router.navigate(['/cart']);
  }
}
