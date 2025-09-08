import { TestBed } from '@angular/core/testing';

import { HabitacionServicioService } from './habitacion-servicio.service';

describe('HabitacionServicioService', () => {
  let service: HabitacionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitacionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
