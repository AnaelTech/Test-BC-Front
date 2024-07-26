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
  public filteredArticles: Article[] = [];
  public selectedCategories: number[] = [];
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
        this.filteredArticles = this.articles;
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

  filterArticlesbyCategory(categoryId: number[]) {
    console.log('Category ID:', categoryId);
    if (categoryId.length > 0) {
      this.filteredArticles = this.articles.filter(
        (article) =>
          article.category &&
          article.category.id !== undefined &&
          categoryId.includes(article.category.id)
      );
      console.log(this.filteredArticles);
    } else {
      this.filteredArticles = this.articles;
    }
  }

  updateSelectedCategories(categoryId: number | undefined, event: Event) {
    if (categoryId === undefined) return;

    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      this.selectedCategories.push(categoryId);
    } else {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.count = this.selectedCategories.length;
    this.filterArticlesbyCategory(this.selectedCategories);
  }

  resetFilters() {
    this.selectedCategories = [];
    this.count = 0;
    this.filteredArticles = this.articles;
  }
}
