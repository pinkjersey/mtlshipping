import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurInvoicesComponent } from './our-invoices.component';

describe('OurInvoicesComponent', () => {
  let component: OurInvoicesComponent;
  let fixture: ComponentFixture<OurInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
