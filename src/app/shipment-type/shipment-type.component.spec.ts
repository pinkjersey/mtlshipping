import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentTypeComponent } from './shipment-type.component';

describe('ShipmentTypeComponent', () => {
  let component: ShipmentTypeComponent;
  let fixture: ComponentFixture<ShipmentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
