import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionesPorHotelComponent } from './habitaciones-por-hotel.component';

describe('HabitacionesPorHotelComponent', () => {
  let component: HabitacionesPorHotelComponent;
  let fixture: ComponentFixture<HabitacionesPorHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitacionesPorHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitacionesPorHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
