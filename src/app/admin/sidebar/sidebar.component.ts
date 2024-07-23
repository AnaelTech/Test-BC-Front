import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../user/user.service';
import { User } from '../../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
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
  isSidebarOpen = false;

  router: Router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUserById().subscribe((data: User) => {
      this.user = data;
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin']);
  }
}
