import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NavComponent } from './shared/nav/nav.component';
import { VacacionesComponent } from './components/vacaciones/vacaciones.component';
import { EmpleadosAddEditComponent } from './components/empleados/empleados-add-edit/empleados-add-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbdModalConfirm } from './shared/modal-confirm/modal-confirm.component';
import { EmpleadosService } from './services/empleados.service';
import { DecimalPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    NavComponent,
    VacacionesComponent,
    EmpleadosAddEditComponent,
    NgbdModalConfirm
  ],
  entryComponents:[
    EmpleadosAddEditComponent,
    NgbdModalConfirm
  ],
  imports: [
    NgbModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [EmpleadosService,DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
