import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-empleados-add-edit',
  templateUrl: './empleados-add-edit.component.html',
  styleUrls: ['./empleados-add-edit.component.scss']
})
export class EmpleadosAddEditComponent implements OnInit {
  @Input() mode: 'ADD'|'EDIT';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Debe ingresar su email' },
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
  constructor(public activeModal: NgbActiveModal, private afs:AngularFirestore) { 
    this.crearFormEmpleado()
  }

  crearFormEmpleado(){
    this.formEmpleado=new FormGroup({
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'nombre':new FormControl(null,Validators.required),
      'apellido':new FormControl(null,Validators.required),
      'telefono':new FormControl(null,Validators.required),
      'dni':new FormControl(null,Validators.required),
      'direccion':new FormControl(null,Validators.required),
    })
  }

  guardarDatos(){
    this.afs.collection('empleados').add(this.formEmpleado.value).then(doc=>{
      //Obtiene el id del doc y lo setea como propiedad a fin de editar el documento después
      this.afs.collection('empleados').doc(doc.id).update({id:doc.id})
    })
  }

  ngOnInit() {
  }

}
