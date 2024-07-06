import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PrestationService } from '../../../prestation/prestation.service';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-register-prestation.component.html',
  styleUrl: './form-register-prestation.component.css',
})
export class FormRegisterPrestationComponent implements OnInit {
  router: Router = inject(Router);
  private prestationService: PrestationService = inject(PrestationService);

  public formRegisterPrestation: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    picture: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}

  Register() {
    if (this.formRegisterPrestation.valid) {
      this.prestationService
        .addPrestation(this.formRegisterPrestation.value)
        .subscribe({
          complete: () => {
            // console.log('Inscription terminée, veuillez vous connecter.');
            // console.log(this.formRegisterUser.value);
            this.router.navigate(['/admin/prestations']);
          },
          error: (err: any) => {
            console.log(
              "L'utilisateur existe déjà ou une autre erreur est survenue :",
              err
            );
            //console.log(this.formRegisterUser.value);
          },
        });
    } else {
      console.log("Le formulaire n'est pas valide.");
    }
    this.formRegisterPrestation.reset();
  }
}
