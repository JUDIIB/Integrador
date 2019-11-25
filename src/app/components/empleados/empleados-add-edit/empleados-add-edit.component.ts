import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleados-add-edit',
  templateUrl: './empleados-add-edit.component.html',
  styleUrls: ['./empleados-add-edit.component.scss']
})
export class EmpleadosAddEditComponent implements OnInit {
  @Input() mode: 'ADD'|'EDIT';
  formEmpleado:FormGroup;
  constructor(public activeModal: NgbActiveModal) { 
    this.crearFormEmpleado()
  }

  crearFormEmpleado(){
    this.formEmpleado=new FormGroup({
      'nombre':new FormControl(null,Validators.required),
      'apellido':new FormControl(null,Validators.required),
      'telefono':new FormControl(null,Validators.required),
      'dni':new FormControl(null,Validators.required),
      'direccion':new FormControl(null,Validators.required),
    })
  }

  guardarDatos(){
    console.log(this.formEmpleado);
    
  }

  ngOnInit() {
  }

}
