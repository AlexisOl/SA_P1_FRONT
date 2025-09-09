import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { DataView } from 'primeng/dataview';
import { ReservaServicioService } from '../../services/hotel/reserva-servicio.service';
import { AuthService } from '../../services/usuario/auth.service';
@Component({
  selector: 'app-reservaciones',
  imports: [HeaderComponent, DataView, ButtonModule, Tag, CommonModule],
  templateUrl: './reservaciones.component.html',
  styleUrl: './reservaciones.component.css'
})
export class ReservacionesComponent implements OnInit {
  reservaciones = signal<any>([]);
  valores:any[]=[]
  idCliente!:String|null


  reservacionServicio = inject(ReservaServicioService)
  authServicio = inject(AuthService)


  ngOnInit(): void {
    //this.idCliente = this.authServicio.getId()

   // if(this.idCliente) {
    this.reservacionServicio.obtenerReservacionesCliente(this.authServicio.getId()).subscribe(
      (valores:any) => {
        console.log(valores);
        this.valores=valores
        //this.reservaciones.set(valores)
        //console.log("aca", this.reservaciones());
      }
    )

    //}
  }

    getSeverity(product: any) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
}