import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ApiListResponse, Article, Category } from '../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  public articles: Article[] = [];
  public categorys: Category[] = [];
  public category: Category[] = [];
  private router: Router = inject(Router);
  private articleService: ArticleService = inject(ArticleService);
  count = 0;

  constructor() {}

  ngOnInit(): void {
    this.getArticles();
    this.getCategory();
  }

  getArticles() {
    this.articleService.getArticles().subscribe({
      next: (response: ApiListResponse<Article>) => {
        this.articles = response['hydra:member'];
      },
      error: (err) => console.error(err),
    });
  }

  getCategory() {
    this.articleService.getCategory().subscribe({
      next: (response: ApiListResponse<Category>) => {
        this.categorys = response['hydra:member'];
      },
      error: (err) => console.error(err),
    });
  }

  goToDetail(article: Article) {
    this.router.navigate(['articles/', article.id]);
  }
}
