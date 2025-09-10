import { TestBed } from '@angular/core/testing';

import { FacturaGeneralRestauranteService } from './factura-general-restaurante.service';

describe('FacturaGeneralRestauranteService', () => {
  let service: FacturaGeneralRestauranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaGeneralRestauranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
