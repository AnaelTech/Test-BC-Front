import { Component, inject, OnInit } from '@angular/core';
import { ApiListResponse, User } from '../../../interface';
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
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  public users: User[] = [];
  public originalUsers: User[] = [];
  public nbOrders: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.userService.getUsers().subscribe((response: ApiListResponse<User>) => {
      this.users = response['hydra:member'].filter((user) =>
        this.isAdmin(user)
      );
      console.log(this.users);
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
