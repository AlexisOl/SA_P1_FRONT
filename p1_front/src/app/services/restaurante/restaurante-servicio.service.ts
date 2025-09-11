import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { hotel } from '../../Models/Hotel';
import { Observable } from 'rxjs';
import { restaurantes } from '../../Models/Restaurantes';

@Injectable({
  providedIn: 'root'
})
export class RestauranteServicioService {

  readonly URL = environment.URL_GATEWAY+"restaurante";
  public listadoHoteles =  signal<hotel[]>([]);

  constructor(private http: HttpClient) {
   }



  public listarRestaurantes():Observable<restaurantes[]> {
    return  this.http.get<restaurantes[]>(
      this.URL
    )
  }

   public crearRestaurantes(restaurante: restaurantes):Observable<restaurantes> {
    return  this.http.post<restaurantes>(
      this.URL, restaurante
    )
  }

    public listarRestauranteEspecifico(id:String):Observable<restaurantes> {
    return  this.http.get<restaurantes>(
      this.URL+"/"+id
    )
  }
}
