import { TestBed } from '@angular/core/testing';

import { CalificacionServicioService } from './calificacion-servicio.service';

describe('CalificacionServicioService', () => {
  let service: CalificacionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
