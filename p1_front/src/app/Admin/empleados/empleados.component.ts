import { Component, inject, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { HeaderComponent } from "../../utils/header/header.component";
import { PanelModule } from 'primeng/panel';
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';
import { RestauranteServicioService } from '../../services/restaurante/restaurante-servicio.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { HabitacionServicioService } from '../../services/hotel/habitacion-servicio.service';
import { DatePipe } from '@angular/common';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../../services/usuario/auth.service';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);
@Component({
  selector: 'app-empleados',
  imports: [SplitterModule, HeaderComponent, PanelModule, TableModule, ButtonModule, RouterLink, DatePipe,
  ],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  first: number = 0;
  rows: number = 6;
  paginatedItems: any[] = [];
  items: any[] = []

  firstHotel: number = 0;
  rowsHotel: number = 6;
  paginatedItemsHotel: any[] = [];
  itemsHotel: any[] = []
  habitacionMejorPuntuada:any
  habitacionMasAlojamiento:any

  hotelServicio = inject(HotelServicioService)
  habitacionServicio = inject(HabitacionServicioService)
  RestauranteServicio = inject(RestauranteServicioService)
  authServicio = inject(AuthService)


  ngOnInit(): void {
    

            this.hotelServicio.listarHotelesPaginator().subscribe(
      (next) => {
          this.itemsHotel = next
          this.updatePaginatedItemsHotel()
          
      }, (error) => {
        console.log(error);
        
      }
    )

        this.RestauranteServicio.listarRestaurantes().subscribe(
      (next) => {
          this.items = next
          this.updatePaginatedItems()

          
      }, (error) => {
        console.log(error);
        
      }
    )

                this.habitacionServicio.listarHabitacionMayorAlojamiento().subscribe(
      (next) => {
          this.habitacionMasAlojamiento = next
          console.log(next);

      }, (error) => {
        console.log(error);
        
      }
    )


                this.habitacionServicio.listarHabitacionMejorPuntuada().subscribe(
      (next) => {
          this.habitacionMejorPuntuada = next

          console.log(next);

      }, (error) => {
        console.log(error);
        
      }
    )
  }

  updatePaginatedItems() {
    this.paginatedItems = this.items.slice(this.first, this.first + this.rows);
  }

    updatePaginatedItemsHotel() {
    this.paginatedItemsHotel = this.itemsHotel.slice(this.firstHotel, this.firstHotel + this.rowsHotel);
  }

generarReporteHotelesPDF() {
  const docDefinition: any = {
    content: [
      { text: 'Reporte de Hoteles', style: 'header' },
      { text: `Fecha: ${new Date().toLocaleDateString()}` },
      { text: `Empleado: ${this.authServicio.getNombre()}` },
      { text: '------------------------------------', margin: [0, 10, 0, 10] },

      // --- Sección 1: Habitación mejor puntuada ---
      { text: 'Habitación mejor puntuada', style: 'subheader', margin: [0, 10, 0, 5] },
      this.habitacionMejorPuntuada
        ? {
            table: {
              widths: ['auto', '*', 'auto', 'auto'],
              body: [
                ['Hotel', 'Habitación', 'Tipo', 'Valoración'],
                [
                  this.habitacionMejorPuntuada.habitacion.hotel.nombre,
                  `#${this.habitacionMejorPuntuada.habitacion.numero_habitacion}`,
                  this.habitacionMejorPuntuada.habitacion.tipoHabitacion,
                  this.habitacionMejorPuntuada.habitacion.promedio_valoracion.toFixed(2),
                ],
              ],
            },
            margin: [0, 0, 0, 10],
          }
        : { text: 'No hay datos disponibles', italics: true },

      // Tabla de reservaciones de la mejor puntuada
      this.habitacionMejorPuntuada?.reservaciones?.length
        ? {
            table: {
              widths: ['auto', 'auto', 'auto'],
              body: [
                ['Entrada', 'Salida', 'Tipo'],
                ...this.habitacionMejorPuntuada.reservaciones.map((r: any) => [
                  new Date(r.fechaEntrada).toLocaleDateString(),
                  new Date(r.fechaSalida).toLocaleDateString(),
                  r.tipoReservacion,
                ]),
              ],
            },
            margin: [0, 0, 0, 20],
          }
        : {},

      // --- Sección 2: Habitación con más alojamientos ---
     
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('reporte_hoteles_habitacion_mejor_puntuada.pdf');
}

generarReporteHotelesMasAlojamientosPDF() {
  const docDefinition: any = {
    content: [
      { text: 'Reporte de Hoteles', style: 'header' },
      { text: `Fecha: ${new Date().toLocaleDateString()}` },
      { text: `Empleado: ${this.authServicio.getNombre()}` },
      { text: '------------------------------------', margin: [0, 10, 0, 10] },

      // --- Sección 1: Habitación mejor puntuada ---
       { text: 'Habitación con más alojamientos', style: 'subheader', margin: [0, 10, 0, 5] },
      this.habitacionMasAlojamiento
        ? {
            table: {
              widths: ['auto', '*', 'auto'],
              body: [
                ['Hotel', 'Habitación', 'Tipo'],
                [
                  this.habitacionMasAlojamiento.habitacion.hotel.nombre,
                  `#${this.habitacionMasAlojamiento.habitacion.numero_habitacion}`,
                  this.habitacionMasAlojamiento.habitacion.tipoHabitacion,
                ],
              ],
            },
            margin: [0, 0, 0, 10],
          }
        : { text: 'No hay datos disponibles', italics: true },

      // Tabla de reservaciones de la más alojada
      this.habitacionMasAlojamiento?.reservaciones?.length
        ? {
            table: {
              widths: ['auto', 'auto', 'auto'],
              body: [
                ['Entrada', 'Salida', 'Tipo'],
                ...this.habitacionMasAlojamiento.reservaciones.map((r: any) => [
                  new Date(r.fechaEntrada).toLocaleDateString(),
                  new Date(r.fechaSalida).toLocaleDateString(),
                  r.tipoReservacion,
                ]),
              ],
            },
            margin: [0, 0, 0, 20],
          }
        : {},
     
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  pdfMake.createPdf(docDefinition).download('reporte_hoteles_habitacion_mas_alojamientos.pdf');
}




}
