import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NavComponent } from './shared/nav/nav.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    NavComponent,
    VacacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
