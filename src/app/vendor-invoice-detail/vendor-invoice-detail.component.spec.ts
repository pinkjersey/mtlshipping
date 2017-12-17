import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoiceDetailComponent } from './vendor-invoice-detail.component';

describe('VendorInvoiceDetailComponent', () => {
  let component: VendorInvoiceDetailComponent;
  let fixture: ComponentFixture<VendorInvoiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInvoiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInvoiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
