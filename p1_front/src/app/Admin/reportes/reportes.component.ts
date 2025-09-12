import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FacturacionHotelService } from '../../services/facturacion/facturacion-hotel.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { ButtonModule } from 'primeng/button';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../../services/usuario/auth.service';
import { CommonModule, DatePipe } from '@angular/common';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);
@Component({
  selector: 'app-reportes',
  imports: [HeaderComponent, TableModule, ButtonModule, DatePipe, CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  idHotel!: String
  facturacionHotelServicio = inject(FacturacionHotelService)
  authServicio = inject(AuthService)

  saldoEmpresa: any[] = []
  saldoFiltrado: any[] = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idHotel = this.route.snapshot.paramMap.get('id')!;
    this.facturacionHotelServicio.obtenerSaldosHotel(Number(this.idHotel)).subscribe(
      (elementos: any) => {
        this.saldoEmpresa = elementos.map((valores:any) => {
            return {
         ...valores,
          inicio_semana: new Date(valores.inicio_semana),
          fin_semana: new Date(valores.fin_semana),
            }
        })
        console.log(elementos);

      }
    )
  }
    onFiltrar(event: any) {
      console.log(event.filteredValue);
      
      this.saldoFiltrado = event.filteredValue;
    }

  // para hacer pdfs
  generarFacturaPDF() {
      const datosParaPDF = this.saldoFiltrado.length ? this.saldoFiltrado : this.saldoEmpresa
console.log(datosParaPDF);

    const documentDefinition: any = {
      content: [
        { text: 'Saldo de la empresa ', style: 'header' },
        { text: `Fecha: ${new Date().toLocaleDateString()}` },
        { text: `Empleado: ` + this.authServicio.getNombre() },
        { text: `------------------------------------` },
        {
          table: {
            widths: ['auto', 'auto', '*'],
            body: [
              ['Inicio de semana', 'Fin de semana', 'Precio'],
              ...datosParaPDF.map((valores: any) => {
                return [   
                  valores.inicio_semana.toLocaleDateString(),
    valores.fin_semana.toLocaleDateString(),
     'Q' + valores.acumulado]
              }),
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
