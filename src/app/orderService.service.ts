import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiListResponse, Order } from './interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getOrders(): Observable<ApiListResponse<Order>> {
    return this.http.get<ApiListResponse<Order>>(this.url + 'orders');
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url + 'orders', order);
  }

  deleteOrder(id: number | undefined): Observable<Order> {
    return this.http.delete<Order>(this.url + 'orders/' + id);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(this.url + 'orders/' + order.id, order);
  }

  getOrder(id: string | undefined): Observable<Order> {
    return this.http.get<Order>(this.url + 'orders/' + id);
  }

}
