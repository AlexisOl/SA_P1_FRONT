import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { calificacion, habitacion } from '../../Models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class CalificacionServicioService {
  readonly URL = environment.URL_GATEWAY+"calificacion";
  public listadoHoteles =  signal<calificacion[]>([]);

  constructor(private http: HttpClient) {
   }



  public listarCalificacionHabitacion( id: String):Observable<calificacion[]> {
    return this.http.get<calificacion[]>(
      this.URL+"/habitacion/"+id)
  }
}
