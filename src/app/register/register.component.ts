import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  private router: Router = inject(Router);

  private userService: UserService = inject(UserService);
  public formRegister: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    genre: new FormControl([], [Validators.required]),
    roles: new FormControl(['ROLE_USER']),
  });

  constructor() {}

  ngOnInit(): void {}

  Register() {
    if (this.formRegister.valid) {
      if (!Array.isArray(this.formRegister.value.genre)) {
        this.formRegister.value.genre = [this.formRegister.value.genre];
      }
      if (!Array.isArray(this.formRegister.value.roles)) {
        this.formRegister.value.roles = ['ROLE_USER'];
      }

      const formData = { ...this.formRegister.value };
      formData.birthday = new Date(
        this.formRegister.value.birthday
      ).toISOString();

      this.userService.addUser(this.formRegister.value).subscribe({
        complete: () => {
          console.log('Inscription terminée, veuillez vous connecter.');
          console.log(this.formRegister.value);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(
            "L'utilisateur existe déjà ou une autre erreur est survenue :",
            err
          );
          console.log(this.formRegister.value);
        },
      });
    } else {
      console.log(this.formRegister.value);
      console.log("Le formulaire n'est pas valide.");
    }
    this.formRegister.reset();
  }
}
