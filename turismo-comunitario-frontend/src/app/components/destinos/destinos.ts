import { Component, inject, OnInit } from '@angular/core';
import { DestinoService } from '../../services/destino';
import { Destino } from '../../models/destino';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destinos',
  imports: [CommonModule],
  templateUrl: './destinos.html',
  styleUrl: './destinos.css',
})
export class Destinos implements OnInit {
  private destinoService = inject(DestinoService);
  destinos: Destino[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.destinoService.getDestinos().subscribe({
      next: (data) => {
        this.destinos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching destinos', err);
        this.error = 'No se pudieron cargar los destinos. Intenta de nuevo más tarde.';
        this.loading = false;
      }
    });
  }
}
