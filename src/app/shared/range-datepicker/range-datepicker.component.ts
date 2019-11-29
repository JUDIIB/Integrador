import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from 'src/app/interfaces/date-range.interface';

@Component({
  selector: 'app-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss']
})
export class RangeDatepickerComponent implements OnInit {

  hoveredDate: NgbDate;
  @Output() dateChanged = new EventEmitter<DateRange>();
  @Input() fromDateInput: string;
  @Input() toDateInput: string;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private calendar: NgbCalendar) {
  }

  parseDateAsNgbDate(date:Date){
    return new NgbDate(date.getFullYear(),date.getMonth()+1,date.getDate());
  }

  ngOnInit() {    
    //Si los valores del input son nulos entonces setea un rango predefinido
    this.fromDate = (this.fromDateInput)?this.parseDateAsNgbDate(new Date(this.fromDateInput)):this.calendar.getToday();
    this.toDate =  (this.toDateInput)?this.parseDateAsNgbDate(new Date(this.toDateInput)):this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    // console.log(this.fromDate);
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

}
