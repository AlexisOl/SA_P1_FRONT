import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HeaderComponent } from "../../utils/header/header.component";
import { HotelServicioService } from '../../services/hotel/hotel-servicio.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-hotel',
  imports: [SplitterModule
     , ScrollPanelModule, CardModule, ButtonModule, 
     PanelModule, PaginatorModule, DialogModule, FileUploadModule, HeaderComponent, RouterLink],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {

  first: number = 0;
  rows: number = 6;
  paginatedItems: any[] = [];
  items: [] = []

  //servicio 
  hotelServicio = inject(HotelServicioService)


  updatePaginatedItems() {
    this.paginatedItems = this.items.slice(this.first, this.first + this.rows);
  }


  ngOnInit(): void {
  }



}
