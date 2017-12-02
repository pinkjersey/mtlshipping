import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoicesComponent } from './vendor-invoices.component';

describe('VendorInvoicesComponent', () => {
  let component: VendorInvoicesComponent;
  let fixture: ComponentFixture<VendorInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
