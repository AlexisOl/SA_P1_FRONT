import { TestBed } from '@angular/core/testing';

import { EmpleadoHotelService } from './empleado-hotel.service';

describe('EmpleadoHotelService', () => {
  let service: EmpleadoHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
