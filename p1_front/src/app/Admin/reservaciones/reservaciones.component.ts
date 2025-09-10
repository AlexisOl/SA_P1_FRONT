import { CalendarModule, DateAdapter,  CalendarView, CalendarEvent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ReservaServicioService } from '../../services/hotel/reserva-servicio.service';
import { ActivatedRoute } from '@angular/router';
import { reservacion } from '../../Models/Hotel';
import { Card, CardModule } from 'primeng/card';

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
     
    CalendarModule    ,
    CardModule,
     Card,
  ],
  templateUrl: './reservaciones.component.html',
  styleUrl: './reservaciones.component.css'
})
export class ReservacionesComponent implements OnInit {
  
  reservacionesServicio = inject(ReservaServicioService)
  ListadoReservaciones:reservacion[]= []
  idHotel!: string
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  events: CalendarEvent[] = [
     ];
  view: CalendarView =CalendarView.Month;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idHotel = this.route.snapshot.paramMap.get('id')!;
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
      console.log(this.events);

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
}
