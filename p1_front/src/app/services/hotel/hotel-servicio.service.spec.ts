import { TestBed } from '@angular/core/testing';

import { HotelServicioService } from './hotel-servicio.service';

describe('HotelServicioService', () => {
  let service: HotelServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
