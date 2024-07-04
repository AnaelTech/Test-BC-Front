import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css',
})
export class LoginAdminComponent {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  public formLoginAdmin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  Login() {
    if (this.formLoginAdmin.valid) {
      this.auth.login(this.formLoginAdmin.value);
      this.router.navigate(['admin/dashboard']);
    }
    this.formLoginAdmin.reset();
  }
}
