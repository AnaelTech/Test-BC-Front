import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Prestation } from '../../../interface';
import { PrestationService } from '../../../prestation/prestation.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit-prestation.component.html',
  styleUrl: './form-edit-prestation.component.css',
})
export class FormEditPrestationComponent implements OnInit {
  prestationService: PrestationService = inject(PrestationService);
  prestations: Prestation[] = [];
  prestation: Prestation = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    picture: '',
    category: '',
  };
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  public formEditPrestation: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    picture: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.prestationService.getPrestationById(id).subscribe(
        (prestation: Prestation) => {
          this.prestation = prestation;
          this.formEditPrestation.patchValue({
            name: prestation.name,
            description: prestation.description,
            price: prestation.price,
            picture: prestation.picture,
          });
        },
        (error) => {
          console.error('Error fetching prestation', error);
        }
      );
    }
  }

  editPrestation() {
    if (this.formEditPrestation.valid) {
      const updatedPrestation: Prestation = {
        ...this.prestation,
        ...this.formEditPrestation.value,
      };
      this.prestationService.updatePrestation(updatedPrestation).subscribe(
        (prestation: Prestation) => {
          this.prestation = prestation;
          this.router.navigate(['admin/prestations']);
        },
        (error) => {
          console.error('Error updating prestation', error);
        }
      );
    }
  }
}
