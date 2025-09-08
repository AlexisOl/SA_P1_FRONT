import { TestBed } from '@angular/core/testing';

import { CalificacionesRestauranteServicioService } from './calificaciones-restaurante-servicio.service';

describe('CalificacionesRestauranteServicioService', () => {
  let service: CalificacionesRestauranteServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionesRestauranteServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
