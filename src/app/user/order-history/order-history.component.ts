import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { RouterLink } from '@angular/router';
import { User } from '../../interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent {
  private userService: UserService = inject(UserService);
  public user: User = {
    '@id': '',
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    picture: '',
    adresse: '',
    orders: [], // TODO: change to OrderArticle[]
  };

  constructor() {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.getUserById().subscribe((data: User) => {
      this.user = data;
      console.log(this.user.orders);
    });
  }
}
