import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'src/app/interfaces/date-range.interface';

@Component({
  selector: 'app-range-datepicker-popup',
  templateUrl: './range-datepicker-popup.component.html',
  styleUrls: ['./range-datepicker-popup.component.scss']
})
export class RangeDatepickerPopupComponent implements OnInit {
  @Output() dateChanged = new EventEmitter<DateRange>();
  @Input() fromDateInput: string;
  @Input() toDateInput: string;
  faCalendar=faCalendar;
  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;
  formRangePopup=new FormGroup({});
  
  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  parseDateAsNgbDate(date:Date){
    return new NgbDate(date.getFullYear(),date.getMonth()+1,date.getDate());
  }

  ngOnInit() {
    //Si los valores del input son nulos entonces setea un rango predefinido
    this.fromDate = (this.fromDateInput)?this.parseDateAsNgbDate(new Date(this.fromDateInput)):this.calendar.getToday();
    this.toDate =  (this.toDateInput)?this.parseDateAsNgbDate(new Date(this.toDateInput)):this.calendar.getNext(this.calendar.getToday(), 'd', 30);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.dateChanged.emit({
      fromDate:new Date(this.fromDate.year,this.fromDate.month-1,this.fromDate.day).toUTCString(),
      toDate:new Date(this.toDate.year,this.toDate.month-1,this.toDate.day).toUTCString()
    })
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
