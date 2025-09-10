import { TestBed } from '@angular/core/testing';

import { FacturacionRestauranteService } from './facturacion-restaurante.service';

describe('FacturacionRestauranteService', () => {
  let service: FacturacionRestauranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturacionRestauranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
