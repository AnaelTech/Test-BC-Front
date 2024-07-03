import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrlLogin;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  login(credentials: any) {
    return this.http.post(this.url, credentials).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
    });
  }

  token() {
    return localStorage.getItem('token');
  }
}
