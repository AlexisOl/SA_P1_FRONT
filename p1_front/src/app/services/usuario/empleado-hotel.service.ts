import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { empleadoHotel, empleadoRestaurante } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoHotelService {
  readonly URL = environment.URL_GATEWAY + "empleadoHotel";

  constructor(private http: HttpClient) {
  }


  public listarEmpleados(id: Number): Observable<any[]> {
    return this.http.get<any[]>(
      this.URL + "/hotel/" + id
    )
  }

  public crearEmpleadosHotel(empleado: any): Observable<empleadoHotel> {
    return this.http.post<empleadoHotel>(
      this.URL, empleado
    )
  }


  public cambiarEstadoEmpleado(id: String){

  }
}
