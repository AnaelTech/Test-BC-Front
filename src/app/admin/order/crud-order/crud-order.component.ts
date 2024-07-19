import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiListResponse, Order, User } from '../../../interface';
import { OrderService } from '../../../orderService.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-crud-order',
  standalone: true,
  imports: [],
  templateUrl: './crud-order.component.html',
  styleUrl: './crud-order.component.css',
})
export class CrudOrderComponent {
  orders: any[] = [];
  originalOrders: Order[] = [];
  selectedOrder: Order | null = null;
  router: Router = inject(Router);
  orderService: OrderService = inject(OrderService);
  userService: UserService = inject(UserService);

  constructor() {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (response: ApiListResponse<Order>) => {
        this.orders = response['hydra:member'];
        this.originalOrders = [...this.orders];
        console.log(this.orders);
      },
    });
  }

  goToAdd() {
    this.router.navigate(['admin/orders/add']);
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.orders = this.orders.filter((u) => u.id !== order.id);
    });
  }

  goToEdit(order: Order) {
    this.router.navigate(['admin/orders/', order.id]);
  }

  search(event: any) {
    if (event.target.value === '') {
      this.orders = [...this.originalOrders];
    } else {
      this.orders = this.orders.filter((order: Order) => {
        return order.id;
        // .toLowerCase()
        // .includes(event.target.value.toLowerCase());
      });
    }
  }

  openModal(order: Order) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);
  }
}
