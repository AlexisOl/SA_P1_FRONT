import { TestBed } from '@angular/core/testing';

import { FacturacionHotelService } from './facturacion-hotel.service';

describe('FacturacionHotelService', () => {
  let service: FacturacionHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturacionHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
