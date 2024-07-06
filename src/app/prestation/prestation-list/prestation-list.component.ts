import { Component, inject } from '@angular/core';
import { Prestation } from '../../interface';
import { PrestationService } from '../prestation.service';

@Component({
  selector: 'app-prestation-list',
  standalone: true,
  imports: [],
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css',
})
export class PrestationListComponent {
  prestations: Prestation[] = [];
  prestationService: PrestationService = inject(PrestationService);

  constructor() {}

  ngOnInit() {
    this.getPrestations();
  }

  getPrestations() {
    this.prestationService.getPrestations().subscribe((prestations) => {
      this.prestations = prestations;
    });
  }
}
