import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { EmpleadoHotelService } from '../../services/usuario/empleado-hotel.service';
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';

@Component({
  selector: 'app-empleados-hotel',
  imports: [HeaderComponent, PanelModule, TableModule, ButtonModule, RouterLink],
  templateUrl: './empleados-hotel.component.html',
  styleUrl: './empleados-hotel.component.css'
})
export class EmpleadosHotelComponent implements OnInit{

  idHotel!:String
  empleadoHotel= inject(EmpleadoHotelService)
  hotelServicio = inject(HotelServicioService)

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
        this.idHotel = this.route.snapshot.paramMap.get('id')!;

  }


 cambiarEstado(){
    
  }
  
  

}
