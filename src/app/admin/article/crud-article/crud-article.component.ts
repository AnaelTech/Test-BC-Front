import { Component, inject } from '@angular/core';
import { ArticleService } from '../../../article/article.service';
import { Router } from '@angular/router';
import { ApiListResponse, Article } from '../../../interface';

@Component({
  selector: 'app-crud-article',
  standalone: true,
  imports: [],
  templateUrl: './crud-article.component.html',
  styleUrl: './crud-article.component.css',
})
export class CrudArticleComponent {
  articles: any[] = [];
  originalArticles: any[] = [];
  router: Router = inject(Router);
  articleService: ArticleService = inject(ArticleService);

  constructor() {}

  ngOnInit(): void {
    this.getPrestations();
  }

  getPrestations() {
    this.articleService.getArticles().subscribe({
      next: (response: ApiListResponse<Article>) => {
        this.articles = response['hydra:member'];
        this.originalArticles = [...this.articles];
      },
    });
  }

  goToAdd() {
    this.router.navigate(['admin/prestations/add']);
  }

  deletePrestation(article: Article) {
    this.articleService.deleteArticle(article.id).subscribe(() => {
      this.articles = this.articles.filter((u) => u.id !== article.id);
    });
  }

  goToEdit(article: Article) {
    this.router.navigate(['admin/articles/', article.id]);
  }

  search(event: any) {
    if (event.target.value === '') {
      this.articles = [...this.originalArticles];
    } else {
      this.articles = this.articles.filter((article: Article) => {
        return article.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    }
  }
}
