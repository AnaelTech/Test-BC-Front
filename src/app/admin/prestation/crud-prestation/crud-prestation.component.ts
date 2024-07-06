import { Component, inject, OnInit } from '@angular/core';
import { PrestationService } from '../../../prestation/prestation.service';
import { Prestation } from '../../../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-prestation',
  standalone: true,
  imports: [],
  templateUrl: './crud-prestation.component.html',
  styleUrl: './crud-prestation.component.css',
})
export class CrudPrestationComponent implements OnInit {
  prestations: any[] = [];
  originalPrestations: any[] = [];
  router: Router = inject(Router);
  prestationService: PrestationService = inject(PrestationService);

  constructor() {}

  ngOnInit(): void {
    this.getPrestations();
  }

  getPrestations() {
    this.prestationService.getPrestations().subscribe({
      next: (prestations: Prestation[]) => (this.prestations = prestations),
    });
  }

  goToAdd() {
    this.router.navigate(['admin/prestations/add']);
  }

  deletePrestation(prestation: Prestation) {
    this.prestationService.deletePrestation(prestation.id).subscribe(() => {
      this.prestations = this.prestations.filter((u) => u.id !== prestation.id);
    });
  }

  goToEdit(prestation: Prestation) {
    this.router.navigate(['admin/prestations/', prestation.id]);
  }

  search(event: any) {
    if (event.target.value === '') {
      this.prestations = [...this.originalPrestations];
    } else {
      this.prestations = this.prestations.filter((prestation: Prestation) => {
        return prestation.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
    }
  }
}
