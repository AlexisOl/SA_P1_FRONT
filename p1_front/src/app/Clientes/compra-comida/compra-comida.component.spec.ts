import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraComidaComponent } from './compra-comida.component';

describe('CompraComidaComponent', () => {
  let component: CompraComidaComponent;
  let fixture: ComponentFixture<CompraComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompraComidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
