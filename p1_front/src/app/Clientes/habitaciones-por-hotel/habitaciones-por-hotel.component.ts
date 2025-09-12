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
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AccordionModule } from 'primeng/accordion';
import { CalificacionServicioService } from '../../services/hotel/calificacion-servicio.service';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectModule } from 'primeng/select';
import { habitacion, reservacion } from '../../Models/Hotel';
import { DropdownModule } from 'primeng/dropdown';
import { AuthService } from '../../services/usuario/auth.service';
import { ReservaServicioService } from '../../services/hotel/reserva-servicio.service';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";
@Component({
  selector: 'app-habitaciones-por-hotel',
  imports: [Card, HeaderComponent, Button, FormsModule, DropdownModule,
    SplitterModule, Rating, FieldsetModule, SelectModule,
    ScrollPanelModule, CardModule, ButtonModule, CalendarModule, CommonModule,
    CurrencyPipe, AccordionModule, AvatarModule, BadgeModule,
    PanelModule, PaginatorModule, DialogModule, FileUploadModule, HeaderComponent, RatingModule, HeaderAdminEmpleadoComponent],
  templateUrl: './habitaciones-por-hotel.component.html',
  styleUrl: './habitaciones-por-hotel.component.css'
})
export class HabitacionesPorHotelComponent implements OnInit {
  listadoHabitaciones: any[] = []
  listadoComentarios: any[] = []
  idHotel!: string
  habitacionServicio = inject(HabitacionServicioService)
  authServicio = inject(AuthService)
  comentariosServicio = inject(CalificacionServicioService)
  reservacionServicio = inject(ReservaServicioService)
  AlertaServicio=inject(AlertaServicioService)

  visible: boolean = false;
  visibleNuevaHabitacion: boolean = false;
  visibleReservacion: boolean = false;


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

  // para las reservaciones
  fechaEntrada!:Date
  fechaSalida!:Date
  habitacion!:String

  // para el calendario

    reservacionesServicio = inject(ReservaServicioService)
    ListadoReservaciones:reservacion[]= []
    readonly CalendarView = CalendarView;
    viewDate = new Date();
    events: CalendarEvent[] = [
       ];
    view: CalendarView =CalendarView.Month;
  
  


  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.idHotel = this.route.snapshot.paramMap.get('id')!;

    this.habitacionServicio.listarHabitaciones(Number(this.idHotel)).subscribe(
      (next: any) => {
        console.log(next);
        this.listadoHabitaciones = next

      }
    )


     this.reservacionesServicio.obtenerReservacionesHotel(this.idHotel).subscribe(
      (valores) => {
        this.ListadoReservaciones = valores

      // Transformamos las reservas en eventos
      this.events = this.ListadoReservaciones.map((reserva:any) => ({
        start: new Date(reserva.fechaEntrada),
        end: new Date(reserva.fechaSalida),
        title: `Habitación ${reserva.habitacion.numero_habitacion} - ${reserva.tipoReservacion}`,
        color: {
          primary: this.randomColor(),
          secondary: this.randomColor()
        },
        allDay: true,
      }));
        
      }

      
    )
  }


  randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

  setView(view: CalendarView) {
    this.view = view;
  }

    closeOpenMonthViewDay() {
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


  guardarReservacion() {

    const nuevaReservacion: reservacion= {
      fechaEntrada: this.fechaEntrada,
      fechaSalida: this.fechaSalida,
      habitacion: this.habitacion,
      idusuario: this.authServicio.getId(),
      tipoReservacion: "EN_ESPERA"
    }

    console.log(nuevaReservacion);
    
    this.reservacionServicio.crearReservacion(nuevaReservacion).subscribe(
      (next) => {
        this.visibleReservacion=false
             this.AlertaServicio.generacionAlerta(
        'Éxito', 'La reservacion fue ingresada correctamente.', 'success'
        )
        
      }, (error) => {
        this.visibleReservacion=false

           this.AlertaServicio.generacionAlerta(
          'Error', 'Hubo un problema al generar la reservacion.', 'error'
        )

      }
    )

  }


}
