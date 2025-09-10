import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DetallefacturacionRestauranteDTO, FacturacionRestaurante } from '../../Models/Facturacion';

@Injectable({
  providedIn: 'root'
})
export class FacturaGeneralRestauranteService {
  readonly URL = environment.URL_GATEWAY + "facturaRestaurante";
  constructor(private http: HttpClient) { }



  obtenerFacturacion(id: String|null) {
    return this.http.get(
      this.URL+"/"+id
    )
  }

}
