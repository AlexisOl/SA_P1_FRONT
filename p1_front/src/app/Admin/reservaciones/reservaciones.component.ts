import { CalendarModule, DateAdapter,  CalendarView, CalendarEvent } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
     // este sí es pipe standalone
    CalendarModule    // 👈 aquí metés todo el módulo
  ],
  templateUrl: './reservaciones.component.html',
  styleUrl: './reservaciones.component.css'
})
export class ReservacionesComponent {
  readonly CalendarView = CalendarView;
  viewDate = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event',
    },
  ];
  view: CalendarView =CalendarView.Month;;

  setView(view: CalendarView) {
    this.view = view;
  }

    closeOpenMonthViewDay() {
  }
}
