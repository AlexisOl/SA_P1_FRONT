import { Injectable, signal } from '@angular/core';
import { empleadoRestaurante } from '../../Models/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoRestauranteService {
  readonly URL = environment.URL_GATEWAY+"empleadoRestaurante";

  constructor(private http: HttpClient) {
   }



  public listarEmpleados(id:String):Observable<empleadoRestaurante[]> {
    return  this.http.get<empleadoRestaurante[]>(
      this.URL+"/restaurante/"+id
    )
  }

   public crearEmpleadosRestaurante(empleado: any):Observable<empleadoRestaurante> {
    return  this.http.post<empleadoRestaurante>(
      this.URL, empleado
    )
  }
}
