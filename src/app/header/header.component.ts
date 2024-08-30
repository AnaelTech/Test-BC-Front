import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  auth: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  user: User = {
    '@id': '',
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    picture: '',
    adresse: '',
  };

  constructor() {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.getUser();
    }
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
  }

  getUser() {
    this.userService.getUserById().subscribe((data: User) => {
      this.user = data;
      console.log(this.user);
    });
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  isSuperAdmin() {
    return this.userService.isSuperAdmin();
  }
}
