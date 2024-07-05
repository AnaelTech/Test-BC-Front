import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  public formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

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
          console.log('Erreur de connexion', error);
          this.router.navigate(['/login']);
          this.formLogin.reset();
        },
      });
    } else {
      console.log('Formulaire invalide');
      this.router.navigate(['/login']);
      this.formLogin.reset();
    }
  }
}
