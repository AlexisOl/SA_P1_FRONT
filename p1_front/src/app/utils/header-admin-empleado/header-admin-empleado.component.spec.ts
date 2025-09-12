import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdminEmpleadoComponent } from './header-admin-empleado.component';

describe('HeaderAdminEmpleadoComponent', () => {
  let component: HeaderAdminEmpleadoComponent;
  let fixture: ComponentFixture<HeaderAdminEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAdminEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAdminEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
