import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurInvoiceDetailComponent } from './our-invoice-detail.component';

describe('OurInvoiceDetailComponent', () => {
  let component: OurInvoiceDetailComponent;
  let fixture: ComponentFixture<OurInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
