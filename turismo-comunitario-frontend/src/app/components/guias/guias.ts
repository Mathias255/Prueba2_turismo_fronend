import { Component, inject, OnInit } from '@angular/core';
import { GuiaService } from '../../services/guia';
import { Guia } from '../../models/guia';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guias',
  imports: [CommonModule],
  templateUrl: './guias.html',
  styleUrl: './guias.css',
})
export class Guias implements OnInit {
  private guiaService = inject(GuiaService);
  guias: Guia[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.guiaService.getGuias().subscribe({
      next: (data) => {
        this.guias = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching guias', err);
        this.error = 'No se pudieron cargar los guías.';
        this.loading = false;
      }
    });
  }
}
