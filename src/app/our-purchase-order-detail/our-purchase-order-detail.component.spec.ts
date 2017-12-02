import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPurchaseOrderDetailComponent } from './our-purchase-order-detail.component';

describe('OurPurchaseOrderDetailComponent', () => {
  let component: OurPurchaseOrderDetailComponent;
  let fixture: ComponentFixture<OurPurchaseOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurPurchaseOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurPurchaseOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
