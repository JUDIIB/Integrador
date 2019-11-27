import { Component, OnInit } from '@angular/core';
import { Vacacion } from 'src/app/interfaces/vacacion.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VacacionesAddEditComponent } from './vacaciones-add-edit/vacaciones-add-edit.component';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openModalAddVacacion(mode:'ADD'|'EDIT',vacacion?:Vacacion) {
    let modalRef=this.modalService.open(VacacionesAddEditComponent);
    modalRef.componentInstance.mode=mode;
    if(vacacion){
      modalRef.componentInstance.vacacionToEdit=vacacion
    }      
  }

}
