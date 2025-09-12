import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';
import { RestauranteServicioService } from '../../services/restaurante/restaurante-servicio.service';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { restaurantes } from '../../Models/Restaurantes';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";
import { AuthService } from '../../services/usuario/auth.service';

@Component({
  selector: 'app-restaurante',
  imports: [HeaderComponent,
    SplitterModule, FieldsetModule,
    ScrollPanelModule, CardModule, ButtonModule,
    PanelModule, PaginatorModule, DialogModule, FileUploadModule, RouterLink, FormsModule, HeaderAdminEmpleadoComponent],
  templateUrl: './restaurante.component.html',
  styleUrl: './restaurante.component.css'
})
export class RestauranteComponent implements OnInit {

  first: number = 0;
  rows: number = 6;
  paginatedItems: any[] = [];
  items: any[] = []
  visibleRestaurante: boolean = false

  //valores de objeto
  idhotel!:Number
  nombre!:String
  telefono!:String
  direccion!:String



  //servicio 
  RestauranteServicio = inject(RestauranteServicioService)
  AlertaServicio = inject(AlertaServicioService)

  authServicio = inject(AuthService)

  updatePaginatedItems() {
    this.paginatedItems = this.items.slice(this.first, this.first + this.rows);
  }

  verDialogoNuevoRestaurante() {
    this.visibleRestaurante = true
  }


  ngOnInit(): void {
    this.RestauranteServicio.listarRestaurantes().subscribe(
      (next) => {
          this.items = next
          this.updatePaginatedItems()

          console.log(next);
          
      }, (error) => {
        console.log(error);
        
      }
    )
  }

  guardarRestaurante() {

    const nuevoRestaurante : restaurantes = {
      nombre: this.nombre,
      telefono: this.telefono,
      direccion: this.direccion,
      idhotel: this.idhotel
    }

    this.RestauranteServicio.crearRestaurantes(nuevoRestaurante).subscribe(
      (next) => {
        console.log(next);
        this.AlertaServicio.generacionAlerta(
        'Éxito', 'El restaurante fue creado correctamente.', 'success'
        )
        
      }, (error) => {
        console.log(error);
    this.AlertaServicio.generacionAlerta(
          'Error', 'Hubo un problema al crear el restaurante.', 'error'
        )
      }
    )
    

  }



}

