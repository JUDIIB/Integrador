import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-empleados-add-edit',
  templateUrl: './empleados-add-edit.component.html',
  styleUrls: ['./empleados-add-edit.component.scss']
})
export class EmpleadosAddEditComponent implements OnInit {
  @Input() mode: 'ADD'|'EDIT';
  @Input() empleadoToEdit: Empleado;
  updated:boolean=false;
  added:boolean=false;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Debe ingresar un email' },
      { type: 'email', message: 'Debe ingresar un email válido.' }
    ],
    'nombre': [
      { type: 'required', message: 'Debe ingresar el nombre' }
    ],
    'apellido': [
      { type: 'required', message: 'Debe ingresar el apellido' },
    ],
    'dni': [
      { type: 'required', message: 'Debe ingresar el DNI' },
    ],
    'telefono': [
      { type: 'required', message: 'Debe ingresar el teléfono' },
    ],
    'direccion': [
      { type: 'required', message: 'Debe ingresar la dirección' },
    ]
  };

  formEmpleado:FormGroup;
  constructor(public activeModal: NgbActiveModal, private _empleadosService:EmpleadosService) { 
    this.crearFormEmpleado();
  }
  

  crearFormEmpleado(){
    this.formEmpleado=new FormGroup({
      'id':new FormControl(null),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'nombre':new FormControl(null,Validators.required),
      'apellido':new FormControl(null,Validators.required),
      'telefono':new FormControl(null,Validators.required),
      'dni': new FormControl(null,Validators.required),
      'direccion':new FormControl(null,Validators.required),
    });
    this.formEmpleado.valueChanges.subscribe(newData=>{
      this.added=false;
      this.updated=false;
    })
  }

  ngOnInit() {
    if(this.empleadoToEdit){
      this.formEmpleado.setValue(this.empleadoToEdit)
    }
  }


  guardarDatos(){
    this._empleadosService.addEmpleado(this.formEmpleado.value).then(doc=>{
      this.added=true;
    })
  }

  editarDatos(){
    this._empleadosService.updateEmpleado(this.formEmpleado.value).then(doc=>{
      this.updated=true;
    })
  }

}
