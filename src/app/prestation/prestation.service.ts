import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prestation } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class PrestationService {
  private url = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getPrestations(): Observable<Prestation[]> {
    return this.http.get<Prestation[]>(this.url + 'prestations');
  }

  getPrestationById(id: string): Observable<Prestation> {
    return this.http.get<Prestation>(this.url + 'prestations/' + id);
  }

  addPrestation(prestation: any): any {
    return this.http.post(this.url + 'prestations', prestation);
  }

  updatePrestation(prestation: Prestation): Observable<Prestation> {
    return this.http.put<Prestation>(
      this.url + 'prestations/' + prestation.id,
      prestation
    );
  }

  deletePrestation(id: number | undefined) {
    return this.http.delete(this.url + 'prestations/' + id);
  }
}
