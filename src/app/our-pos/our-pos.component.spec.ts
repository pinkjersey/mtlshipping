import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPosComponent } from './our-pos.component';

describe('OurPosComponent', () => {
  let component: OurPosComponent;
  let fixture: ComponentFixture<OurPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
