import { Destino } from './destino';
import { Guia } from './guia';

export interface Reserva {
  id?: number;
  cantidadPersonas: number;
  fechaTour: string; // ISO date string or Date
  nombreCliente: string;
  totalPagar?: number;
  destinoId: number;
  guiaId: number;
  // Optional relations
  destino?: Destino;
  guia?: Guia;
}
