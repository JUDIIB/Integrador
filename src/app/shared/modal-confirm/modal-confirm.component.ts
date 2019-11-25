import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class NgbdModalConfirm {
  @Input() header: string;
  @Input() titulo: string;
  @Input() description: string;
  @Input() text_danger: string;
  @Input() cbYes: ()=> any;
  constructor(public modal: NgbActiveModal) {}

  yesAction(){
    this.cbYes();
    this.modal.close('Ok click');
  }
}