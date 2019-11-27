 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';

const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'vacaciones', component: VacacionesComponent  },
  { path: '**', pathMatch:'full',  redirectTo:'empleados' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


