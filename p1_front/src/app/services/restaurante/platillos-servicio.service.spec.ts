import { TestBed } from '@angular/core/testing';

import { PlatillosServicioService } from './platillos-servicio.service';

describe('PlatillosServicioService', () => {
  let service: PlatillosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatillosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
