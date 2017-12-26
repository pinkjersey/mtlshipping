import { TestBed, inject } from '@angular/core/testing';

import { VesselService } from './vessel.service';

describe('VesselService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VesselService]
    });
  });

  it('should be created', inject([VesselService], (service: VesselService) => {
    expect(service).toBeTruthy();
  }));
});
