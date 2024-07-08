import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Article, Category } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url + 'articles');
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories');
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(this.url + 'categories/' + id);
  }
}
