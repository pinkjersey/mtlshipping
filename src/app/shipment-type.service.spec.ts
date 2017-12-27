import { TestBed, inject } from '@angular/core/testing';

import { ShipmentTypeService } from './shipment-type.service';

describe('ShipmentTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipmentTypeService]
    });
  });

  it('should be created', inject([ShipmentTypeService], (service: ShipmentTypeService) => {
    expect(service).toBeTruthy();
  }));
});
