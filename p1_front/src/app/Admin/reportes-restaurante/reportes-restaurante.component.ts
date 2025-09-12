import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { FacturacionHotelService } from '../../services/facturacion/facturacion-hotel.service';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { HeaderAdminEmpleadoComponent } from "../../utils/header-admin-empleado/header-admin-empleado.component";
import { AuthService } from '../../services/usuario/auth.service';

@Component({
  selector: 'app-reportes-restaurante',
  imports: [HeaderComponent, TableModule, HeaderAdminEmpleadoComponent],
  templateUrl: './reportes-restaurante.component.html',
  styleUrl: './reportes-restaurante.component.css'
})
export class ReportesRestauranteComponent implements OnInit {
  idHotel!: String
  facturacionHotelServicio = inject(FacturacionHotelService)
    authServicio = inject(AuthService)
  
  saldoEmpresa: any[] = []

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idHotel = this.route.snapshot.paramMap.get('id')!;
    this.facturacionHotelServicio.obtenerSaldosHotel(Number(this.idHotel)).subscribe(
      (elementos: any) => {
        this.saldoEmpresa = elementos
        console.log(elementos);

      }
    )
  }

}
