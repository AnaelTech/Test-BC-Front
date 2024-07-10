import { Component, inject, OnInit } from '@angular/core';
import { PrestationService } from '../prestation/prestation.service';
import { Prestation } from '../interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
})
export class ContentComponent implements OnInit {
  PrestationService: PrestationService = inject(PrestationService);
  prestations: Prestation[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getPrestations();
  }

  getPrestations() {
    this.PrestationService.getPrestations().subscribe(
      (prestations: Prestation[]) => {
        this.prestations = prestations.slice(0, 3);
      }
    );
  }
}
