import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HeaderComponent } from "../../utils/header/header.component";
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';
import { RouterLink } from '@angular/router';
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";
import { AuthService } from '../../services/usuario/auth.service';
import { restaurantes } from '../../Models/Restaurantes';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
import { hotel } from '../../Models/Hotel';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
@Component({
  selector: 'app-hotel',
  imports: [SplitterModule,
    ScrollPanelModule, CardModule, ButtonModule,FormsModule,FieldsetModule,
    PanelModule, PaginatorModule, DialogModule, FileUploadModule, HeaderComponent, RouterLink, HeaderAdminEmpleadoComponent],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {

  first: number = 0;
  rows: number = 6;
  paginatedItems: any[] = [];
  items: [] = []

  //servicio 
  hotelServicio = inject(HotelServicioService)
  authServicio = inject(AuthService)
  AlertaServicio = inject(AlertaServicioService)

  nombre!:String
  telefono!:Number
  direccion!:String
  visibleHotel: boolean = false


  updatePaginatedItems() {
    this.paginatedItems = this.items.slice(this.first, this.first + this.rows);
  }


  ngOnInit(): void {
  }

  verDialogoNuevoHotel() {
    this.visibleHotel = true
  }

    guardarHotel() {
  
      const nuevoHotel : hotel = {
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono
      }
  
      this.hotelServicio.crearHotel(nuevoHotel).subscribe(
        (next) => {
          this.visibleHotel=false
          this.AlertaServicio.generacionAlerta(
          'Éxito', 'El hotel fue creado correctamente.', 'success'
          )
          
        }, (error) => {
          this.visibleHotel=false

      this.AlertaServicio.generacionAlerta(
            'Error', 'Hubo un problema al crear el hotel.', 'error'
          )
        }
      )
      
  
    }


}
