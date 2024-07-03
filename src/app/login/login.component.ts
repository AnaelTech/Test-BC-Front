import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private auth: AuthService = inject(AuthService);

  public formLogin: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  Login() {
    if (this.formLogin.valid) {
      this.auth.login(this.formLogin.value);
    }
    this.formLogin.reset();
  }
}
