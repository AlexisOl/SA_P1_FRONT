import { TestBed } from '@angular/core/testing';

import { RestauranteServicioService } from './restaurante-servicio.service';

describe('RestauranteServicioService', () => {
  let service: RestauranteServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestauranteServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
