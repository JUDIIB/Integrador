import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { faTrash,faUserEdit,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosAddEditComponent } from './empleados-add-edit/empleados-add-edit.component';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { NgbdModalConfirm } from '../../shared/modal-confirm/modal-confirm.component';

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
  constructor(private db: AngularFirestore,private modalService: NgbModal){
    this.empleados = db.collection<Empleado>('empleados').valueChanges();
  }
  
  ngOnInit() {
  }

  openModalAddEmpleado(mode:'ADD'|'EDIT') {
    let modalRef=this.modalService.open(EmpleadosAddEditComponent);
    modalRef.componentInstance.mode=mode;
  }

  openModalConfirmDeleteEmpleado(empleado:Empleado) {
    let modalRef=this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.header="Eliminar empleado";
    modalRef.componentInstance.titulo="¿Está seguro que desea eliminar el empleado?";
    modalRef.componentInstance.description="El empleado será eliminado definitivamente";
    modalRef.componentInstance.text_danger="Esta acción no puede ser revertida";
    // modalRef.componentInstance.cbYes.bind(this);
    modalRef.componentInstance.cbYes=()=>{
      this.db.collection('empleados').doc(empleado.id).delete()
    }

  }

}
