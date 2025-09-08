import { Injectable, signal } from '@angular/core';
import { habitacion } from '../../Models/Hotel';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionServicioService {

  readonly URL = environment.URL_GATEWAY+"habitaciones";
  public listadoHoteles =  signal<habitacion[]>([]);

  constructor(private http: HttpClient) {
   }



  public listarHabitaciones( id: Number):Observable<habitacion[]> {
    return this.http.get<habitacion[]>(
      this.URL+"/"+id)
  }


  crearHabitacion(habitacion:habitacion) {
    return this.http.post(
      this.URL, habitacion
    )
  }
}
