import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destino } from '../models/destino';

@Injectable({
  providedIn: 'root',
})
export class DestinoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/destinos'; // Update if needed

  getDestinos(): Observable<Destino[]> {
    return this.http.get<Destino[]>(this.apiUrl);
  }

  getDestino(id: number): Observable<Destino> {
    return this.http.get<Destino>(`${this.apiUrl}/${id}`);
  }
}
