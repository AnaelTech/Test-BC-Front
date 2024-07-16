import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ApiListResponse, Article, Category, Prestation } from '../interface';

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

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(this.url + 'categories/' + id);
  }

  getOriginCategory(Category: string): Observable<ApiListResponse<Category>> {
    return this.http.get<ApiListResponse<Category>>(this.originUrl + Category);
  }

  getOriginPrestation(
    Prestation: string
  ): Observable<ApiListResponse<Prestation>> {
    return this.http.get<ApiListResponse<Prestation>>(
      this.originUrl + Prestation
    );
  }
}
