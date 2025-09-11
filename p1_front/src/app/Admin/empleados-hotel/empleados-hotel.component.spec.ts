import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosHotelComponent } from './empleados-hotel.component';

describe('EmpleadosHotelComponent', () => {
  let component: EmpleadosHotelComponent;
  let fixture: ComponentFixture<EmpleadosHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
