import { Component, OnInit, Input } from '@angular/core';
import { Vacacion } from 'src/app/interfaces/vacacion.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { DateRange } from 'src/app/interfaces/date-range.interface';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-vacaciones-add-edit',
  templateUrl: './vacaciones-add-edit.component.html',
  styleUrls: ['./vacaciones-add-edit.component.scss']
})
export class VacacionesAddEditComponent implements OnInit {

  @Input() mode: 'ADD' | 'EDIT';
  @Input() vacacionToEdit: Vacacion;
  $empleados: Observable<Empleado[]>;
  updated: boolean = false;
  added: boolean = false;

  validation_messages = {
    'descripcion': [
      { type: 'required', message: 'Debe ingresar una descripción' },
    ],
    'fecha_inicio': [
      { type: 'required', message: 'Debe ingresar la fecha de inicio' }
    ],
    'fecha_fin': [
      { type: 'required', message: 'Debe ingresar la fecha  de fin' },
    ],
    'empleado_id': [
      { type: 'required', message: 'Debe seleccionar el empleado' },
    ]
  };

  formVacacion: FormGroup;
  constructor(public activeModal: NgbActiveModal,
    private _empleadosService: EmpleadosService,
    private _vacacionesService: VacacionesService) {
    this.crearFormVacacion();
    this.$empleados =_empleadosService.getEmpleados();
  }


  crearFormVacacion() {
    this.formVacacion = new FormGroup({
      'id': new FormControl(null),
      'descripcion': new FormControl(null, Validators.required),
      'fecha_inicio': new FormControl(null, Validators.required),
      'fecha_fin': new FormControl(null, Validators.required),
      'empleado_id': new FormControl(null, Validators.required)
    });
    this.formVacacion.valueChanges.subscribe(newData => {
      this.added = false;
      this.updated = false;
    })
  }

  ngOnInit() {
    if (this.vacacionToEdit) {
      this.formVacacion.setValue(this.vacacionToEdit)
    }
  }

  setDates(date_range: DateRange) {
    this.formVacacion.controls['fecha_inicio'].setValue(date_range.fromDate);
    this.formVacacion.controls['fecha_fin'].setValue(date_range.toDate);
  } 

  agregarDatos() {
    console.log(this.formVacacion.value);
    this._vacacionesService.addVacacion(this.formVacacion.value)
  }

  editarDatos() {
    this._vacacionesService.editVacacion(this.formVacacion.value)
  }

}
