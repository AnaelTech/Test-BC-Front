import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../interface';
import { UserService } from '../../../user/user.service';
import { FormEditComponent } from '../form-edit/form-edit.component';
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

  constructor() {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  goToEdit(user: User) {
    this.router.navigate(['admin/employees/', user.id]);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
    });
  }
}
