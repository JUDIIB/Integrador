import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
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
import { VacacionesAddEditComponent } from './components/vacaciones/vacaciones-add-edit/vacaciones-add-edit.component';
import { RangeDatepickerComponent } from './shared/range-datepicker/range-datepicker.component';
import { VacacionesService } from './services/vacaciones.service';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

// the second parameter is optional
registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent,
    EmpleadosComponent,
    NavComponent,
    VacacionesComponent,
    EmpleadosAddEditComponent,
    NgbdModalConfirm,
    VacacionesAddEditComponent,
    RangeDatepickerComponent
  ],
  entryComponents: [
    EmpleadosAddEditComponent,
    VacacionesAddEditComponent,
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
  providers: [
    EmpleadosService,
    VacacionesService,
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
