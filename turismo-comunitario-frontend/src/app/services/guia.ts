import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guia } from '../models/guia';

@Injectable({
  providedIn: 'root',
})
export class GuiaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/guias'; // Update if needed

  getGuias(): Observable<Guia[]> {
    return this.http.get<Guia[]>(this.apiUrl);
  }

  getGuiasDisponibles(): Observable<Guia[]> {
    // Replace with correct backend endpoint for available guides if exists
    return this.http.get<Guia[]>(`${this.apiUrl}/search/disponibles`);
  }
}
