import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../interface';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-user',
  standalone: true,
  imports: [],
  templateUrl: './crud-user.component.html',
  styleUrl: './crud-user.component.css',
})
export class CrudUserComponent implements OnInit {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);
  users: User[] = [];
  originalUsers: User[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) =>
        (this.users = users.filter((user) => this.isAdmin(user))),
    });
  }

  isAdmin(user: User): boolean {
    return user.roles.includes('ROLE_ADMIN');
  }

  goToEdit(user: User) {
    this.router.navigate(['admin/employees/', user.id]);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }

  goToAdd() {
    this.router.navigate(['admin/employees/add']);
  }

  search(event: any) {
    if (event.target.value === '') {
      this.users = [...this.originalUsers];
    } else {
      this.users = this.users.filter((user: User) => {
        return user.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    }
  }
}
