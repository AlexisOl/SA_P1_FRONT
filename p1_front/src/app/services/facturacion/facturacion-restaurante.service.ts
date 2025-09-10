import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { DetallefacturacionRestauranteDTO, FacturacionHotel } from '../../Models/Facturacion';

@Injectable({
  providedIn: 'root'
})
export class FacturacionRestauranteService {
  readonly URL = environment.URL_GATEWAY + "detalleFacturaRestaurante";
  constructor(private http: HttpClient) { }

  crearFacturacion(facturacion: DetallefacturacionRestauranteDTO) {
    return this.http.post(
      this.URL, facturacion
    )
  }


  obtenerFacturacionEspecifica(id: String) {
    return this.http.get(
      this.URL+"/"+id
    )
  }

}
