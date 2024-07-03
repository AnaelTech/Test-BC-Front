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
      this.saveToken(data.token);
    });
  }

  token() {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      return !!token;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
