import { Injectable } from '@angular/core';
import { Platillo, restaurantes } from '../../Models/Restaurantes';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlatillosServicioService {

  readonly URL = environment.URL_GATEWAY+"platillos";

  constructor(private http: HttpClient) {
   }



  public listarPlatillos(id:String):Observable<Platillo[]> {
    return  this.http.get<Platillo[]>(
      this.URL+"/restaurante/"+id
    )
  }

    public listarPlatillosGloables():Observable<Platillo[]> {
    return  this.http.get<Platillo[]>(
      this.URL
    )
  }

   public crearPlatillos(platillos: Platillo):Observable<Platillo> {
    return  this.http.post<Platillo>(
      this.URL, platillos
    )
  }
}
