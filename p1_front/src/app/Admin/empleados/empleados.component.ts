import { Component, inject, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { HeaderComponent } from "../../utils/header/header.component";
import { PanelModule } from 'primeng/panel';
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';
import { RestauranteServicioService } from '../../services/restaurante/restaurante-servicio.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-empleados',
  imports: [SplitterModule, HeaderComponent, PanelModule, TableModule, ButtonModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit{
  first: number = 0;
  rows: number = 6;
  paginatedItems: any[] = [];
  items: any[] = []

  firstHotel: number = 0;
  rowsHotel: number = 6;
  paginatedItemsHotel: any[] = [];
  itemsHotel: any[] = []

  hotelServicio = inject(HotelServicioService)
  RestauranteServicio = inject(RestauranteServicioService)

  ngOnInit(): void {
    

            this.hotelServicio.listarHotelesPaginator().subscribe(
      (next) => {
          this.itemsHotel = next
          this.updatePaginatedItemsHotel()
          
      }, (error) => {
        console.log(error);
        
      }
    )

        this.RestauranteServicio.listarRestaurantes().subscribe(
      (next) => {
          this.items = next
          this.updatePaginatedItems()

          console.log(next);
          
      }, (error) => {
        console.log(error);
        
      }
    )
  }

  updatePaginatedItems() {
    this.paginatedItems = this.items.slice(this.first, this.first + this.rows);
  }

    updatePaginatedItemsHotel() {
    this.paginatedItemsHotel = this.itemsHotel.slice(this.firstHotel, this.firstHotel + this.rowsHotel);
  }



}
