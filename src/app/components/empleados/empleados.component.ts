import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { faTrash,faUserEdit,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosAddEditComponent } from './empleados-add-edit/empleados-add-edit.component';
import { Empleado } from 'src/app/interfaces/empleado.interface';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {
  faTrash=faTrash;
  faUserEdit=faUserEdit;
  faUserPlus=faUserPlus;
  empleados: Observable<Empleado[]>;
  constructor(db: AngularFirestore,private modalService: NgbModal){
    this.empleados = db.collection<Empleado>('empleados').valueChanges();
  }
  
  ngOnInit() {
  }

  openModalAddEmpleado(mode:'ADD'|'EDIT') {
    let modalRef=this.modalService.open(EmpleadosAddEditComponent);
    modalRef.componentInstance.mode=mode;
  }

}
