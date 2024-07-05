import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../user/user.service';
import { User } from '../../interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  auth: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  user: User = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    profilPicture: '',
  };

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

  isAdmin() {
    return this.userService.isAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin']);
  }
}
