import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);
  public formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public errorMessage: string = '';

  ngOnInit(): void {}

  Login() {
    if (this.formLogin.valid) {
      this.auth.login(this.formLogin.value).subscribe({
        next: () => {
          if (this.auth.isLoggedIn()) {
            console.log('Connexion réussie');
            this.router.navigate(['/']);
          } else {
            console.log('Erreur de connexion');
            this.router.navigate(['/login']);
          }
          this.formLogin.reset();
        },
        error: (error) => {
          this.errorMessage = 'L\'email ou le mot de passe est incorrect';
          this.router.navigate(['/login']);
          this.formLogin.reset();
        },
      });
    } else {
      this.errorMessage = 'Email ou mot de passe incorrect';
      this.router.navigate(['/login']);
      this.formLogin.reset();
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.formLogin.controls[controlName].hasError(errorName) && this.formLogin.controls[controlName].touched;
  }
}
