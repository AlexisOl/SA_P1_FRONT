import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/usuario/auth.service';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
@Component({
  selector: 'app-registro',
  imports: [FormsModule, InputTextModule, ButtonModule, InputGroupModule, InputGroupAddonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  username: string = '';
  password: string = '';
  cui!: number;
  nombre: string = '';
  fechaNacimiento!: string; 
  direccion: string = '';
  telefono: string = '';
  correo: string = '';


  usuarioServicio = inject(AuthService)
  AlertaServicio = inject(AlertaServicioService)


  registrarUsuario(){
    const nuevoUsuarioDTO: any = {
     username:this.username,
     password:this.password,
     cui:this.cui,
     nombre:this.nombre,
     fechaNacimiento:this.fechaNacimiento,
     direccion:this.direccion,
     telefono:this.telefono,
     correo:this.correo,
    }

    this.usuarioServicio.registrarUsuario(nuevoUsuarioDTO).subscribe(
            (next) => {
        console.log(next);
        this.AlertaServicio.generacionAlerta(
        'Éxito', 'El usuario fue creado correctamente.', 'success'
        )
        
      }, (error) => {
        console.log(error);
    this.AlertaServicio.generacionAlerta(
          'Error', 'Hubo un problema al crear el usuario.', 'error'
        )
      }
    )
  }


}
