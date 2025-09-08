import { TestBed } from '@angular/core/testing';

import { AlertaServicioService } from './alerta-servicio.service';

describe('AlertaServicioService', () => {
  let service: AlertaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
