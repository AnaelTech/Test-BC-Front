import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiListResponse, Order } from '../../../interface';
import { OrderService } from '../../../orderService.service';

@Component({
  selector: 'app-crud-order',
  standalone: true,
  imports: [],
  templateUrl: './crud-order.component.html',
  styleUrl: './crud-order.component.css',
})
export class CrudOrderComponent {
  orders: any[] = [];
  originalOrders: any[] = [];
  router: Router = inject(Router);
  orderService: OrderService = inject(OrderService);

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
}
