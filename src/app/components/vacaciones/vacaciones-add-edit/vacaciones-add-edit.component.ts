import { Component, OnInit, Input } from '@angular/core';
import { Vacacion } from 'src/app/interfaces/vacacion.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VacacionService } from 'src/app/services/vacacion.service';
import { DateRange } from 'src/app/interfaces/date-range.interface';

@Component({
  selector: 'app-vacaciones-add-edit',
  templateUrl: './vacaciones-add-edit.component.html',
  styleUrls: ['./vacaciones-add-edit.component.scss']
})
export class VacacionesAddEditComponent implements OnInit {

  @Input() mode: 'ADD' | 'EDIT';
  @Input() vacacionToEdit: Vacacion;
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
  constructor(public activeModal: NgbActiveModal, private _vacacionService: VacacionService) {
    this.crearFormEmpleado();
  }


  crearFormEmpleado() {
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

  setDates(date_range:DateRange){
    console.log(date_range);
    
  }

  agregarDatos() {

  }

  editarDatos() {

  }

}
