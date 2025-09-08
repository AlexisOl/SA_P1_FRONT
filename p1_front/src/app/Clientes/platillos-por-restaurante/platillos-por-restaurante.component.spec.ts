import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatillosPorRestauranteComponent } from './platillos-por-restaurante.component';

describe('PlatillosPorRestauranteComponent', () => {
  let component: PlatillosPorRestauranteComponent;
  let fixture: ComponentFixture<PlatillosPorRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatillosPorRestauranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatillosPorRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
