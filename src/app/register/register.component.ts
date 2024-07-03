import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  genders = ['Male', 'Female', 'Other', 'Prefer not to say'];

  private userService: UserService = inject(UserService);
  public formRegister: FormGroup = new FormGroup({
    name: new FormControl(''),
    lastname: new FormControl(''),
    adresse: new FormControl(''),
    birthday: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    genre: new FormControl([]),
    roles: new FormControl(['ROLE_USER']),
  });

  constructor() {}

  ngOnInit(): void {}

  Register() {
    if (this.formRegister.valid) {
      if (!Array.isArray(this.formRegister.value.genre)) {
        this.formRegister.value.genre = [this.formRegister.value.genre];
      }
      this.userService.addUser(this.formRegister.value).subscribe({
        complete: () => {
          console.log('Inscription terminée, veuillez vous connecter.');
          console.log(this.formRegister.value);
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
      console.log("Le formulaire n'est pas valide.");
    }
    this.formRegister.reset();
  }
}
