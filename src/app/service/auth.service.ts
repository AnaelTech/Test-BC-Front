import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.apiUrlLogin;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.url, credentials).pipe(
      tap((data) => {
        if (data.token) {
          this.saveToken(data.token);
        }
      })
    );
  }

  token() {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    const token = this.token();
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
