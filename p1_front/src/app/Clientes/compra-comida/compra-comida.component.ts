import { CommonModule } from '@angular/common';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { Tag } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../../utils/header/header.component';
import { DataView } from 'primeng/dataview';
import { FacturacionRestauranteService } from '../../services/facturacion/facturacion-restaurante.service';
import { AuthService } from '../../services/usuario/auth.service';
import { FacturaGeneralRestauranteService } from '../../services/facturacion/factura-general-restaurante.service';
import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-compra-comida',
  imports: [HeaderComponent, DataView, ButtonModule, CommonModule, DialogModule, FormsModule, TableModule,
    ConfirmPopupModule, ToastModule, TextareaModule, RatingModule, TreeTableModule],
  templateUrl: './compra-comida.component.html',
  styleUrl: './compra-comida.component.css',
  providers: []
})
export class CompraComidaComponent implements OnInit {

  valores: [] = []
  valoresDetallados: [] = []
  facturaDetalladaRestauranteServicio = inject(FacturacionRestauranteService)
  facturaRestauranteServicio = inject(FacturaGeneralRestauranteService)
  authServicio = inject(AuthService)
  ngOnInit(): void {
    this.facturaRestauranteServicio.obtenerFacturacion(this.authServicio.getId()).subscribe(
      (facturas: any) => {
        const observablesDetalles = facturas.map((factura: any) =>
          this.facturaDetalladaRestauranteServicio.obtenerFacturacionEspecifica(factura.id)
        );

        forkJoin(observablesDetalles).subscribe((detallesArray: any) => {
          this.valores = facturas.map((factura: any, index: number) => (

            {

              data: {
                id: factura.id,
                fecha: factura.fecha,
                precioTotal: detallesArray[index].reduce(
                  (acc: number, precio: any) => acc + precio.precioParcial,
                  0
                )
              },
              children: detallesArray[index].map((detalle: any) => ({
                data: detalle,
                precio: detalle.precioParcial
              }))


            }));

          console.log("Facturas con detalles como TreeNode:", this.valores);
        });
      }
    );

  }


  // para hacer pdfs
  generarFacturaPDF(item: any) {
    console.log(item);
    
    const documentDefinition: any = {
      content: [
        { text: 'Factura ' + item.data.id, style: 'header' },
        { text: `Fecha: ${item.data.fecha}` },
        { text: `------------------------------------` },
        {
          table: {
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Descripción', 'Cantidad', 'Precio'],
              ...item.children.map((valores:any)=> {
             return [ valores.data.idplatillo, valores.data.cantidad , 'Q' + valores.precio]
              }),

              [{ text: 'TOTAL', bold: true }, '', { text: 'Q' + item.data.precioTotal, bold: true }]
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

    pdfMake.createPdf(documentDefinition).download('facturaRestaurante.pdf');
  }
}
