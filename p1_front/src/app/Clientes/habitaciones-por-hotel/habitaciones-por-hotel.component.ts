import { Component, inject, OnInit } from '@angular/core';
import { HabitacionServicioService } from '../../services/hotel/habitacion-servicio.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule, Button } from 'primeng/button';
import { CardModule, Card } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SplitterModule } from 'primeng/splitter';
import { HeaderComponent } from '../../utils/header/header.component';
import { RatingModule } from 'primeng/rating';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { CalificacionServicioService } from '../../services/hotel/calificacion-servicio.service';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectModule } from 'primeng/select';
import { habitacion } from '../../Models/Hotel';
@Component({
  selector: 'app-habitaciones-por-hotel',
  imports: [Card, HeaderComponent, Button, FormsModule,
    SplitterModule, Rating, FieldsetModule, SelectModule
    , ScrollPanelModule, CardModule, ButtonModule,
    CurrencyPipe, AccordionModule, AvatarModule, BadgeModule,
    PanelModule, PaginatorModule, DialogModule, FileUploadModule, HeaderComponent, RouterLink, RatingModule
  ],
  templateUrl: './habitaciones-por-hotel.component.html',
  styleUrl: './habitaciones-por-hotel.component.css'
})
export class HabitacionesPorHotelComponent implements OnInit {
  listadoHabitaciones: any[] = []
  listadoComentarios: any[] = []
  idHotel!: string
  habitacionServicio = inject(HabitacionServicioService)
  comentariosServicio = inject(CalificacionServicioService)
  visible: boolean = false;
  visibleNuevaHabitacion: boolean = false;

  // para la habitacion
  numeroHabitacion!: Number
  cantidad_camas!: number
  hotel!: number
  tipoHabitacion!: any
  precio!: Number
  tiposHabitacion = [
    { label: 'Simple', value: 'SIMPLE' },
    { label: 'Doble', value: 'DOBLE' },
    { label: 'Triple', value: 'TRIPLE' },
    { label: 'VIP', value: 'VIP' },
  ];


  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.idHotel = this.route.snapshot.paramMap.get('id')!;

    this.habitacionServicio.listarHabitaciones(Number(this.idHotel)).subscribe(
      (next: any) => {
        console.log(next);
        this.listadoHabitaciones = next

      }
    )
  }



  showDialog(id: String) {
    this.visible = true;
    this.listadoComentarios = []

    this.comentariosServicio.listarCalificacionHabitacion(id).subscribe(
      (next: any) => {
        console.log(next);
        this.listadoComentarios = next

      }
    )
  }


  verDialogoNuevaHabitacion() {
    this.visibleNuevaHabitacion = true
  }


  guardarHabitacion() {

    const nuevaHabitacion: habitacion = {
      numero_habitacion: this.numeroHabitacion,
      cantidad_camas: this.cantidad_camas,
      id_hotel: this.hotel,
      tipoHabitacion: this.tipoHabitacion.value,
      precio: this.precio,
      promedio_valoracion: 0
    }

    console.log(nuevaHabitacion);
    
    this.habitacionServicio.crearHabitacion(nuevaHabitacion).subscribe(
      (next) => {
        console.log(next);
        
      }, (error) => {
        console.log(error);

      }
    )
  }


}
