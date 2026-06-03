import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva';
import { DestinoService } from '../../services/destino';
import { GuiaService } from '../../services/guia';
import { Destino } from '../../models/destino';
import { Guia } from '../../models/guia';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas implements OnInit {
  private fb = inject(FormBuilder);
  private reservaService = inject(ReservaService);
  private destinoService = inject(DestinoService);
  private guiaService = inject(GuiaService);

  reservaForm!: FormGroup;
  destinos: Destino[] = [];
  guias: Guia[] = [];
  loading = false;
  successMsg = '';
  errorMsg = '';

  ngOnInit() {
    this.reservaForm = this.fb.group({
      nombreCliente: ['', Validators.required],
      cantidadPersonas: [1, [Validators.required, Validators.min(1)]],
      fechaTour: ['', Validators.required],
      destinoId: ['', Validators.required],
      guiaId: ['', Validators.required],
    });

    this.cargarDatos();
  }

  cargarDatos() {
    this.destinoService.getDestinos().subscribe((d) => this.destinos = d);
    this.guiaService.getGuias().subscribe((g) => this.guias = g.filter(guia => guia.disponible));
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      this.loading = true;
      this.successMsg = '';
      this.errorMsg = '';

      const formValue = this.reservaForm.value;

      // Construimos el payload con la estructura exacta que le encanta a Hibernate
      const payload = {
        nombreCliente: formValue.nombreCliente,
        cantidadPersonas: formValue.cantidadPersonas,
        fechaTour: formValue.fechaTour,
        destino: { id: Number(formValue.destinoId) },
        guia: { id: Number(formValue.guiaId) }
      };

      // Usamos (payload as any) para saltarnos el bloqueo estricto de TypeScript
      this.reservaService.crearReserva(payload as any).subscribe({
        next: (reserva) => {
          this.loading = false;
          this.successMsg = '¡Reserva creada exitosamente!';
          this.reservaForm.reset({ cantidadPersonas: 1 });
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
          this.errorMsg = 'Hubo un error al crear la reserva. Intenta de nuevo.';
        }
      });
    }
  }
}