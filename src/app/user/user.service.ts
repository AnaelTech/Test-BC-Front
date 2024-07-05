import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { User } from '../interface';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth: AuthService = inject(AuthService);
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  addUser(user: any) {
    return this.http.post(this.url + 'users', user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users');
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + 'users/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + 'users/' + user.id, user);
  }

  deleteUser(id: number | undefined) {
    return this.http.delete(this.url + 'users/' + id);
  }

  getRoles() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      const roles = tokenPayload.roles;
      return roles;
    }
  }

  getUserById(): Observable<User> {
    const userId = this.getUserId();
    return this.http.get<User>(this.url + 'users/' + userId);
  }

  getUserId() {
    const token = this.auth.token();
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      const userId = tokenPayload.id;
      return userId;
    }
  }

  isAdmin(): boolean {
    const userRoles = this.getRoles();
    if (userRoles && Array.isArray(userRoles)) {
      const isAdmin = userRoles.includes('ROLE_ADMIN');
      return isAdmin;
    } else {
      console.log('role : VISITOR');
      return false;
    }
  }

  isSuperAdmin(): boolean {
    const userRoles = this.getRoles();
    if (userRoles && Array.isArray(userRoles)) {
      const isSuperAdmin = userRoles.includes('ROLE_SUPER_ADMIN');
      console.log('role : SUPER_ADMIN');
      return isSuperAdmin;
    } else {
      return false;
    }
  }
}
