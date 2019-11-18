import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-empleados-add-edit',
  templateUrl: './empleados-add-edit.component.html',
  styleUrls: ['./empleados-add-edit.component.scss']
})
export class EmpleadosAddEditComponent implements OnInit {
  @Input() mode: 'ADD'|'EDIT';
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
