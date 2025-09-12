import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { calificacion } from '../../Models/Hotel';
import { calificacionPlatillo } from '../../Models/Restaurantes';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesRestauranteServicioService {
  readonly URL = environment.URL_GATEWAY+"calificacionRestaurante";
  public listadoHoteles =  signal<calificacionPlatillo[]>([]);

  constructor(private http: HttpClient) {
   }



  public listarCalificacionPLatillo( id: String):Observable<calificacionPlatillo[]> {
    return this.http.get<calificacionPlatillo[]>(
      this.URL+"/restaurante/"+id)
  }


    crearComentario(nuevaCalificacion: calificacionPlatillo[]) {
      return this.http.post(
        this.URL, nuevaCalificacion
      )
    }
}
