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

  ngOnInit(): void {
    this.Login();
  }

  Login() {
    if (this.formLogin.valid) {
      this.auth.login(this.formLogin.value);
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['/profil']);
      }
    } else {
      console.log('Erreur de connexion');
      this.router.navigate(['/']);
    }
    this.formLogin.reset();
  }
}
