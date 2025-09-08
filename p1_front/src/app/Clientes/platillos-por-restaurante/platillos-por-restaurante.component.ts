import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Button, ButtonModule } from 'primeng/button';
import { Card, CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { Rating, RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectModule } from 'primeng/select';
import { SplitterModule } from 'primeng/splitter';
import { HeaderComponent } from '../../utils/header/header.component';
import { CalificacionesRestauranteServicioService } from '../../services/restaurante/calificaciones-restaurante-servicio.service';
import { PlatillosServicioService } from '../../services/restaurante/platillos-servicio.service';
import { Platillo } from '../../Models/Restaurantes';
import { AlertaServicioService } from '../../services/utils/alerta-servicio.service';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-platillos-por-restaurante',
  imports: [
    Card, HeaderComponent, Button, FormsModule,
    SplitterModule, Rating, FieldsetModule, SelectModule, TagModule
    , ScrollPanelModule, CardModule, ButtonModule,
    CurrencyPipe, AccordionModule, AvatarModule, BadgeModule,
    PanelModule, PaginatorModule, DialogModule, FileUploadModule, HeaderComponent,  RatingModule
  ],
  templateUrl: './platillos-por-restaurante.component.html',
  styleUrl: './platillos-por-restaurante.component.css'
})
export class PlatillosPorRestauranteComponent implements OnInit {
  listadoPlatillos: any[] = []
  listadoComentarios: any[] = []
  idRestaurante!: string
  platillosServicio = inject(PlatillosServicioService)
  comentariosRestauranteServicio = inject(CalificacionesRestauranteServicioService)
    AlertaServicio = inject(AlertaServicioService)
  
  visible: boolean = false;
  visibleNuevoPlatillo: boolean = false;

  // para la habitacion
  nombre!: String
  tipoPlatillo!: any
  precio!: Number

  // para el paginator
  first: number = 0;
  rows: number = 6;
  paginatedItems: any[] = [];
  items: any[] = []


  tipoPlatillos = [
    { label: 'Entrada', value: 'ENTRADA' },
    { label: 'Bebida', value: 'BEBIDA' },
    { label: 'Platillo fuerte', value: 'PLATILLO_FUERTE' },
    { label: 'Antojito', value: 'ANTOJITO' },
  ];


  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.idRestaurante = this.route.snapshot.paramMap.get('id')!;

    this.platillosServicio.listarPlatillos(Number(this.idRestaurante)).subscribe(
      (next: any) => {
        console.log(next);
        this.items = next
        this.updatePaginatedItems()

      }
    )
  }

  updatePaginatedItems() {
    this.paginatedItems = this.items.slice(this.first, this.first + this.rows);
  }

  showDialog(id: String) {
    this.visible = true;
    this.listadoComentarios = []

    // this.comentariosServicio.listarCalificacionHabitacion(id).subscribe(
    //   (next: any) => {
    //     console.log(next);
    //     this.listadoComentarios = next

    //   }
    // )
  }


  verDialogoNuevaHabitacion() {
    this.visibleNuevoPlatillo = true
  }


  guardarHabitacion() {

    const nuevoPlatillo: Platillo = {
      nombre: this.nombre,
      precio: this.precio,
      tipo: this.tipoPlatillo.value,
      idrestaurante: (this.idRestaurante)
    }

    console.log(nuevoPlatillo);
    
    this.platillosServicio.crearPlatillos(nuevoPlatillo).subscribe(
      (next) => {
        this.visibleNuevoPlatillo=false
             this.AlertaServicio.generacionAlerta(
        'Éxito', 'El platillo fue creado correctamente.', 'success'
        )
        
      }, (error) => {
        this.visibleNuevoPlatillo=false

           this.AlertaServicio.generacionAlerta(
          'Error', 'Hubo un problema al crear el platillo.', 'error'
        )

      }
    )
  }


}