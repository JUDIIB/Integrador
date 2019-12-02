import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatepickerPopupComponent } from './range-datepicker-popup.component';

describe('RangeDatepickerPopupComponent', () => {
  let component: RangeDatepickerPopupComponent;
  let fixture: ComponentFixture<RangeDatepickerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeDatepickerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeDatepickerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
