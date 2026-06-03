import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Destinos } from './components/destinos/destinos';
import { Guias } from './components/guias/guias';
import { Reservas } from './components/reservas/reservas';



export const routes: Routes = [
  { path: '', component: Home },
  { path: 'destinos', component: Destinos },
  { path: 'guias', component: Guias },
  { path: 'reservas', component: Reservas },
  { path: '**', redirectTo: '' }
];