import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css',
})
export class FormRegisterComponent {
  genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  router: Router = inject(Router);

  private userService: UserService = inject(UserService);

  public formRegisterUser: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    adresse: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    genre: new FormControl([]),
    roles: new FormControl(['ROLE_ADMIN']),
    picture: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  Register() {
    if (this.formRegisterUser.valid) {
      if (!Array.isArray(this.formRegisterUser.value.genre)) {
        this.formRegisterUser.value.genre = [this.formRegisterUser.value.genre];
      }
      this.userService.addUser(this.formRegisterUser.value).subscribe({
        complete: () => {
          console.log('Inscription terminée, veuillez vous connecter.');
          console.log(this.formRegisterUser.value);
          this.router.navigate(['/admin/employees']);
        },
        error: (err) => {
          console.log(
            "L'utilisateur existe déjà ou une autre erreur est survenue :",
            err
          );
          console.log(this.formRegisterUser.value);
        },
      });
    } else {
      console.log("Le formulaire n'est pas valide.");
    }
    this.formRegisterUser.reset();
  }
}
