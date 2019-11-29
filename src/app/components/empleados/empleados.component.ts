import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { faTrash,faUserEdit,faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EmpleadosAddEditComponent } from './empleados-add-edit/empleados-add-edit.component';
import { Empleado } from 'src/app/interfaces/empleado.interface';
import { NgbdModalConfirm } from '../../shared/modal-confirm/modal-confirm.component';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormGroup, FormControl } from '@angular/forms';

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
  filterForm = new FormGroup({
    'filter':new FormControl('')
  })

  constructor(private _empleadosService:EmpleadosService,private modalService: NgbModal){
    this.empleados = _empleadosService.getEmpleados();
    this.filterForm.controls['filter'].valueChanges.subscribe(filterString=>{
      _empleadosService.$filterTerm.next(filterString)
    })
  }
  
  ngOnInit() {
  }

  openModalAddEmpleado(mode:'ADD'|'EDIT',empleado?:Empleado) {
    let modalRef=this.modalService.open(EmpleadosAddEditComponent);
    modalRef.componentInstance.mode=mode;
    if(empleado){
      modalRef.componentInstance.empleadoToEdit=empleado
    }      
  }

  openModalConfirmDeleteEmpleado(empleado:Empleado) {
    let modalRef=this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.header="Eliminar empleado";
    modalRef.componentInstance.titulo="¿Está seguro que desea eliminar el empleado?";
    modalRef.componentInstance.description="El empleado será eliminado definitivamente.";
    modalRef.componentInstance.text_danger="Esta acción no puede ser revertida";
    // modalRef.componentInstance.cbYes.bind(this);
    modalRef.componentInstance.cbYes=()=>{
      this._empleadosService.deleteEmpleado(empleado)
    }

  }

}
