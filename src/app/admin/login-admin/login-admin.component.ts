import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent {
  private userService: UserService = inject(UserService);
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  public formLoginAdmin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.userService.getRoles();
  }

  Login() {
    if (this.formLoginAdmin.valid) {
      this.auth.login(this.formLoginAdmin.value).subscribe({
        next: () => {
          if (
            this.isAdmin() ||
            (this.isSuperAdmin() && this.auth.isLoggedIn())
          ) {
            console.log('Connexion réussie');
            this.router.navigate(['admin/dashboard']);
          } else {
            console.log('Erreur de connexion');
            this.router.navigate(['/admin']);
            return;
          }
          this.formLoginAdmin.reset();
        },
        error: (error) => {
          console.log('Erreur de connexion', error);
          this.router.navigate(['/admin']);
          this.formLoginAdmin.reset();
        },
      });
    } else {
      console.log('Formulaire invalide');
      this.router.navigate(['/admin']);
      this.formLoginAdmin.reset();
    }
  }

  isAdmin() {
    return this.userService.isAdmin();
  }

  isSuperAdmin() {
    return this.userService.isSuperAdmin();
  }
}
