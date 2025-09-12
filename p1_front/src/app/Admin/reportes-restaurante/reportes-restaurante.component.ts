import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../utils/header/header.component";
import { FacturacionHotelService } from '../../services/facturacion/facturacion-hotel.service';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-reportes-restaurante',
  imports: [HeaderComponent, TableModule],
  templateUrl: './reportes-restaurante.component.html',
  styleUrl: './reportes-restaurante.component.css'
})
export class ReportesRestauranteComponent implements OnInit {
  idHotel!: String
  facturacionHotelServicio = inject(FacturacionHotelService)
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
