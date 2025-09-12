import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesRestauranteComponent } from './reportes-restaurante.component';

describe('ReportesRestauranteComponent', () => {
  let component: ReportesRestauranteComponent;
  let fixture: ComponentFixture<ReportesRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesRestauranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
