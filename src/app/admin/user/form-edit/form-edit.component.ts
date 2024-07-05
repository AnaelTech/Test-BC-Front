import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../interface';
import { UserService } from '../../../user/user.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.css',
})
export class FormEditComponent implements OnInit {
  userService: UserService = inject(UserService);
  users: User[] = [];
  user: User = {
    id: 0,
    name: '',
    lastname: '',
    email: '',
    roles: '',
    profilPicture: '',
  };
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  public formEditUser: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    picture: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe(
        (user: User) => {
          this.user = user;
          this.formEditUser.patchValue({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            picture: user.profilPicture,
          });
        },
        (error) => {
          console.error('Error fetching user', error);
        }
      );
    }
  }

  editUser() {
    if (this.formEditUser.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.formEditUser.value,
      };
      this.userService.updateUser(updatedUser).subscribe(
        (user: User) => {
          this.user = user;
          this.router.navigate(['admin/employees']);
        },
        (error) => {
          console.error('Error updating user', error);
        }
      );
    }
  }
}
