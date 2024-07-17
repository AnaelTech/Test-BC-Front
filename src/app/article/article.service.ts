import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiListResponse, Article, Category } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = environment.apiUrl;
  private originUrl = environment.originUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getArticles(): Observable<ApiListResponse<Article>> {
    return this.http.get<ApiListResponse<Article>>(this.url + 'articles');
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(this.url + 'articles/' + id);
  }

  getCategory(): Observable<ApiListResponse<Category>> {
    return this.http.get<ApiListResponse<Category>>(this.url + 'categories');
  }

  deleteArticle(id: number | undefined) {
    return this.http.delete(this.url + 'articles/' + id);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.url + 'articles/' + article.id, article);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(this.url + 'articles/' + id);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url + 'articles', article);
  }
}
