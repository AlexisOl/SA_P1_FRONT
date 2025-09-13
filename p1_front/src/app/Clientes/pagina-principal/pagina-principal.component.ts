import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";
import { AuthService } from '../../services/usuario/auth.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { CarouselModule } from 'primeng/carousel';
import { HabitacionServicioService } from '../../services/hotel/habitacion-servicio.service';
import { PlatillosServicioService } from '../../services/restaurante/platillos-servicio.service';
@Component({
  selector: 'app-pagina-principal',
  imports: [HeaderComponent, HeaderAdminEmpleadoComponent,

        SplitterModule,
    PanelModule,
    TableModule,
    ButtonModule,
    CarouselModule
  ],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent implements OnInit{
  ngOnInit(): void {
    
        this.platillosServicio.listarPlatillosGloables().subscribe(
            (elementos) => {
                this.ListadoPlatillos = elementos
                console.log(elementos);
                
            }
        )

                this.habitacionServicio.listarHabitacionesGlobales().subscribe(
            (elementos) => {
                this.ListadoHabitaciones = elementos
                console.log(elementos);
                
            }
        )

  }
  authServicio = inject(AuthService)
  platillosServicio = inject(PlatillosServicioService)
  habitacionServicio = inject(HabitacionServicioService)

  ListadoHabitaciones:any
  ListadoPlatillos:any

}
