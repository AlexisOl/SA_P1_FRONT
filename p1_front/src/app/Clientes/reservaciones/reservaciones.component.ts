import { Component, inject, OnInit, signal } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);


import { HeaderComponent } from "../../utils/header/header.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { DataView } from 'primeng/dataview';
import { ReservaServicioService } from '../../services/hotel/reserva-servicio.service';
import { AuthService } from '../../services/usuario/auth.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FacturacionHotelService } from '../../services/facturacion/facturacion-hotel.service';
import { FacturacionHotel } from '../../Models/Facturacion';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { ConfirmationService, MessageService } from 'primeng/api';
import { calificacion } from '../../Models/Hotel';
import { CalificacionServicioService } from '../../services/hotel/calificacion-servicio.service';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";

@Component({
  selector: 'app-reservaciones',
  imports: [HeaderComponent, DataView, ButtonModule, Tag, CommonModule, DialogModule, FormsModule,
    ConfirmPopupModule, ConfirmDialog, ToastModule, TextareaModule, RatingModule, HeaderAdminEmpleadoComponent],
  templateUrl: './reservaciones.component.html',
  styleUrl: './reservaciones.component.css',
  providers: [ConfirmationService, MessageService]
})
export class ReservacionesComponent implements OnInit {
  reservaciones = signal<any>([]);
  valores: any[] = []
  idCliente!: String | null


  reservacionServicio = inject(ReservaServicioService)
  calificacionServicio = inject(CalificacionServicioService)
  facturacionServicion = inject(FacturacionHotelService)
  alertaServicion = inject(AlertaServicioService)
  authServicio = inject(AuthService)
  confirmationService = inject(ConfirmationService)
  messageService = inject(MessageService)

  fecha!: number
  visibleComentario: boolean = false
  calificacion!: Number
  comentario!:string
  idReservacionSeleccionada!:String


  ngOnInit(): void {
    //this.idCliente = this.authServicio.getId()

    // if(this.idCliente) {
    this.reservacionServicio.obtenerReservacionesCliente(this.authServicio.getId()).subscribe(
      (valores: any) => {


        this.valores = valores.map((reserva: any) => ({
          ...reserva,
          dias:  ((new Date(reserva.fechaSalida).getTime() -
              new Date(reserva.fechaEntrada).getTime()) /
              (1000 * 60 * 60 * 24)),
          precioGlobal: reserva.habitacion.precio *
            ((new Date(reserva.fechaSalida).getTime() -
              new Date(reserva.fechaEntrada).getTime()) /
              (1000 * 60 * 60 * 24))
        }));

        console.log("aca", this.valores);
      }
    )

    //}
  }

  getSeverity(product: any) {
    switch (product.tipoReservacion) {
      case 'EN_ESPERA':
        return 'success';

      case 'CANCELADA':
        return 'danger';

      case 'PAGADA':
        return 'warn';

      default:
        return null;
    }
  };


  confirm1(event: Event, item: any) {

    const confirmarFacturacion: FacturacionHotel = {
      fecha: new Date(Date.now()),
      id_reservacion: item.id,
      precio: item.precioGlobal
    };

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Save',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-secondary p-button-outlined',

      accept: () => {
        this.facturacionServicion.crearFacturacion(confirmarFacturacion)
          .subscribe(() => {
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Facturación creada'
            });

            this.visibleComentario=true
              this.idReservacionSeleccionada = item.id;
          });
      },

      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Rejected',
          detail: 'Acción cancelada',
          life: 3000
        });
      }
    });
  }


  guardarComentario(){
    const nuevaCalificacion : calificacion = {
      comentario: this.comentario,
      puntuacion: this.calificacion,
      reservacion: this.idReservacionSeleccionada
    };


    this.calificacionServicio.crearComentario(
      nuevaCalificacion
    ).subscribe(
            (next) => {
        this.visibleComentario=false
             this.alertaServicion.generacionAlerta(
        'Éxito', 'El comentario fue registrado correctamente.', 'success'
        )
        
      }, (error) => {
        this.visibleComentario=false

           this.alertaServicion.generacionAlerta(
          'Error', 'Hubo un problema al registrar su comentario.', 'error'
        )

      }
    )
  }


  // para hacer pdfs
    generarFacturaPDF(item:any) {
    
    const documentDefinition: any = {
      content: [
        { text: 'Factura '+item.habitacion.hotel.nombre, style: 'header' },
        { text: `Fecha: ${new Date().toLocaleDateString()}` },
        { text: `Cliente: `+this.authServicio.getNombre() },
        { text: `------------------------------------` },
        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Descripción', 'Cantidad', 'Precio'],
              ['Habitación '+item.habitacion.tipoHabitacion, item.dias+' noches', 'Q'+item.precioGlobal],
              [{ text: 'TOTAL', bold: true }, '', { text: 'Q'+item.precioGlobal, bold: true }]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('factura.pdf');
  }

}