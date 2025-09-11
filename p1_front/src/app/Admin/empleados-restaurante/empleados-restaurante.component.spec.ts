import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosRestauranteComponent } from './empleados-restaurante.component';

describe('EmpleadosRestauranteComponent', () => {
  let component: EmpleadosRestauranteComponent;
  let fixture: ComponentFixture<EmpleadosRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosRestauranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
