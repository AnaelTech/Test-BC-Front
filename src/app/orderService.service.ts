import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  createOrder() {
    return this.http.post(this.url + 'orders', {});
  }
}
