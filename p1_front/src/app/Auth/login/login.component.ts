import { Component, inject } from '@angular/core';
import { FocusTrapModule } from 'primeng/focustrap';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/usuario/auth.service';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';


@Component({
  selector: 'app-login',
  imports: [FocusTrapModule,ButtonModule, 
    RouterLink, 
    FormsModule, InputTextModule, CheckboxModule, IconFieldModule, InputIconModule, AutoFocusModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    username: string = '';
    password!: string

    
    //servicio 
    authServicio = inject(AuthService)
  AlertaServicio = inject(AlertaServicioService)
  route = inject(Router)



    ingresoUsuario(){
      this.authServicio.loginUsuario(
        this.username,
        this.password
      ).subscribe(
            (next:any) => {
        console.log(next);
        this.AlertaServicio.generacionAlerta(
        'Éxito', 'Ingreso correcto de sesion.', 'success'
        )
        console.log(next);
        
        this.validarTipoUsuario(next)
        
      }, (error) => {
        console.log(error);
    this.AlertaServicio.generacionAlerta(
          'Error', 'Ingreso incorrecto de sesion.', 'error'
        )
      }
      )
    }


      validarTipoUsuario(token: string) {
    this.authServicio.saveToken(token);
    // genera el guard
    const idArea = this.authServicio.getTipoEmpleadoNombre();
    console.log(idArea);

    
    if (idArea !== null) {
      /*  1	cliente
          2	admin
          3 trabajador    
    */

      if (idArea === "CLIENTE") {
        this.route.navigate(['/hotel_restaurante/']);
      } else if (idArea === "ADMINISTRADOR") {
        this.route.navigate(['/admin/']);
      } else {
        this.route.navigate(['/bodega/']);
      } 
    }
  }
}
