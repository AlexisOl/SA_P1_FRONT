import { TestBed } from '@angular/core/testing';

import { EmpleadoRestauranteService } from './empleado-restaurante.service';

describe('EmpleadoRestauranteService', () => {
  let service: EmpleadoRestauranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoRestauranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
