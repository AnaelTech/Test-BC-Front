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
  currentEmployee: User | null = null;
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
        //console.log(this.orders);
        this.getCurrentEmployee();
      },
    });
  }

  getCurrentEmployee() {
    this.userService.getUserById().subscribe((data: User) => {
      this.currentEmployee = data;
       // avoir le user courant pour filtrer les orders si le user est égale a l'employee de l'order alors j'affiche les order de l'employee
       if (this.currentEmployee) {
        if (this.isSuperAdmin()) {
          // Si l'utilisateur est superAdmin, ne filtre pas les commandes
          this.orders = this.originalOrders;
          console.log('superadmin');  
        } else {
          // Si l'utilisateur n'est pas superAdmin, filtrer les commandes
            this.orders = this.originalOrders.filter((order: Order) => {
              return order.employee === this.currentEmployee?.id;
            });
            console.log('non superadmin');
        }
        // Si l'utilisateur n'est ni superAdmin ni employé lié à une commande, this.orders sera vide
        console.log('nononononno');
            }
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

  isSuperAdmin() {
    return this.userService.isSuperAdmin();
  }

  openModal(order: Order) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);
  }
}
