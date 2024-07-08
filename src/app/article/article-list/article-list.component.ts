import { Component, inject, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Article, Category } from '../../interface';

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
  public category: any[] = [];
  private articleService: ArticleService = inject(ArticleService);
  count = 0;

  constructor() {}

  ngOnInit(): void {
    this.getArticles();
    this.getCategory();
  }

  getArticles() {
    this.articleService.getArticles().subscribe((articles: Article[]) => {
      this.articles = articles.map((article) => ({
        ...article,
        category: this.getCategoryName(article.category),
      }));
      console.log(this.articles);
    });
  }

  getCategory() {
    this.articleService.getCategory().subscribe((category: any) => {
      this.categorys = category;
      console.log(this.categorys);
    });
  }

  getCategoryById(id: string) {
    this.articleService.getCategoryById(id).subscribe((category: any) => {
      this.category = category;
      console.log(this.category);
    });
  }

  getCategoryName(categoryUrl: string): string {
    const categoryId = categoryUrl.split('/').pop();
    if (!categoryId) {
      return 'Unknown';
    }
    const category = this.categorys.find(
      (cat) => cat.id === parseInt(categoryId, 10)
    );
    return category ? category.name : 'Unknown';
  }
}
