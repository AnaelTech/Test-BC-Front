import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiListResponse, Order, Prestation, User } from '../../../interface';
import { OrderService } from '../../../orderService.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-form-edit-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit-order.component.html',
  styleUrl: './form-edit-order.component.css',
})
export class FormEditOrderComponent {
  statuts = ['En cours', 'Terminé', 'En attente de récuperation'];
  orderService: OrderService = inject(OrderService);
  orders: Order[] = [];
  users: User[] = [];
  order: Order | undefined = undefined;
  userService: UserService = inject(UserService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  public formEditOrder: FormGroup = new FormGroup({
    statut: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
    article_commande: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getCurrentOrder();
    this.getEmployee();
  }

  getCurrentOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrder(id).subscribe(
        (order: Order) => {
          this.order = order;
          this.formEditOrder.patchValue({
            client: order.client,
            statut: order.statut,
            employee: order.employee,
            article_commande: order.article_commande,
          });
          //console.log(this.order);
        },
        (error) => {
          console.error('Error fetching prestation', error);
        }
      );
    }
  }

  editOrder() {
    if (!Array.isArray(this.formEditOrder.value.statut)) {
      this.formEditOrder.value.statut = [this.formEditOrder.value.statut];
    }
    this.formEditOrder.value.client = this.formEditOrder.value.client['@id'];
    this.formEditOrder.value.article_commande =
      this.formEditOrder.value.article_commande['@id'];
    console.log(this.formEditOrder.value.article_commande);

    if (this.formEditOrder.valid) {
      const updatedOrder: Order = {
        ...this.order,
        ...this.formEditOrder.value,
      };
      this.orderService.updateOrder(updatedOrder).subscribe(
        (order: Order) => {
          this.order = order;
          console.log(this.formEditOrder.value);
          this.router.navigate(['admin/orders']);
        },
        (error) => {
          console.log(this.formEditOrder.value);
          console.error('Error updating order', error);
        }
      );
    }
  }

  getEmployee() {
    this.userService.getUsers().subscribe((response: ApiListResponse<User>) => {
      this.users = response['hydra:member'].filter((user) =>
        this.isAdmin(user)
      );
    });
  }

  isAdmin(user: User): boolean {
    return user.roles.includes('ROLE_ADMIN');
  }
}
