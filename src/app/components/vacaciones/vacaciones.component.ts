import { Component,OnInit } from '@angular/core';
import { Vacacion } from 'src/app/interfaces/vacacion.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VacacionesAddEditComponent } from './vacaciones-add-edit/vacaciones-add-edit.component';
import { faPlus,faEdit,faTrash,faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { FormGroup,FormControl } from '@angular/forms';
import { VacacionesService } from 'src/app/services/vacaciones.service';
import { NgbdModalConfirm } from 'src/app/shared/modal-confirm/modal-confirm.component';
import { DateRange } from 'src/app/interfaces/date-range.interface';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.scss']
})
export class VacacionesComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faCalendar = faCalendar;

  vacaciones: Observable<Vacacion[]>;
  filterForm = new FormGroup({
    'filterString': new FormControl(''),
    'fromDate': new FormControl(''),
    'toDate': new FormControl('')
  })
  constructor(private modalService: NgbModal,private vacacionesService: VacacionesService) {
    this.vacaciones = vacacionesService.getVacaciones();
    this.filterForm.valueChanges.subscribe(currentFilter=>{
      vacacionesService.$filter.next(currentFilter);
    })
  }

  ngOnInit() {
  }

  setDates(date_range: DateRange) {
    this.filterForm.controls['fromDate'].setValue(date_range.fromDate);
    this.filterForm.controls['toDate'].setValue(date_range.toDate);
  } 

  openModalAddVacacion(mode: 'ADD' | 'EDIT',vacacion?: Vacacion) {
    let modalRef = this.modalService.open(VacacionesAddEditComponent);
    modalRef.componentInstance.mode = mode;
    if (vacacion) {
      modalRef.componentInstance.vacacionToEdit = vacacion
    }
  }

  openModalConfirmDeleteVacacion(vacacion: Vacacion) {
    let modalRef = this.modalService.open(NgbdModalConfirm);
    modalRef.componentInstance.header = "Eliminar vacación";
    modalRef.componentInstance.titulo = "¿Está seguro que desea eliminar la vacación?";
    modalRef.componentInstance.description = "Esta vacación será eliminada definitivamente.";
    modalRef.componentInstance.text_danger = "Esta acción no puede ser revertida";
    // modalRef.componentInstance.cbYes.bind(this);
    modalRef.componentInstance.cbYes = () => {
      this.vacacionesService.deleteVacacion(vacacion)
    }

  }

}
