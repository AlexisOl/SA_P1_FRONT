import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";
import { AuthService } from '../../services/usuario/auth.service';

@Component({
  selector: 'app-reportes-generales',
  imports: [HeaderComponent, HeaderAdminEmpleadoComponent],
  templateUrl: './reportes-generales.component.html',
  styleUrl: './reportes-generales.component.css'
})
export class ReportesGeneralesComponent {
  authServicio = inject(AuthService)

}
