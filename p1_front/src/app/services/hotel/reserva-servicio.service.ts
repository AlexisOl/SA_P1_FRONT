import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { reservacion } from '../../Models/Hotel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaServicioService {
  readonly URL = environment.URL_GATEWAY + "reservacion";
  constructor(private http: HttpClient) { }

  crearReservacion(nuevaReservacion: reservacion) {
    return this.http.post(
      this.URL, nuevaReservacion
    )
  }


  obtenerReservacionesCliente(id: String|null): Observable<reservacion[]> {
    return this.http.get<reservacion[]>(
      this.URL + "/clientes/" + id
    )
  }

    obtenerReservacionesHotel(id: String|null): Observable<reservacion[]> {
    return this.http.get<reservacion[]>(
      this.URL + "/hotel/" + id
    )
  }


}
