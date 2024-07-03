import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  addUser(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.url + 'users', JSON.stringify(user), {
      headers,
    });
  }
}
