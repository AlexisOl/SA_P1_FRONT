import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { reservacion } from '../../Models/Hotel';
import { FacturacionHotel } from '../../Models/Facturacion';

@Injectable({
  providedIn: 'root'
})
export class FacturacionHotelService {

  readonly URL = environment.URL_GATEWAY + "detalleFactura";
  constructor(private http: HttpClient) { }

  crearFacturacion(facturacion: FacturacionHotel) {
    return this.http.post(
      this.URL, facturacion
    )
  }



}
