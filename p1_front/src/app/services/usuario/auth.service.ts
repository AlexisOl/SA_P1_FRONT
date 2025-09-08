import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { hotel } from '../../Models/Hotel';
import { restaurantes } from '../../Models/Restaurantes';
import { usuario } from '../../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL = environment.URL_GATEWAY+"usuario";
  public listadoHoteles =  signal<usuario[]>([]);

  constructor(private http: HttpClient) {
   }



 
   public registrarUsuario(usuario: any):Observable<usuario> {
    return  this.http.post<usuario>(
      this.URL, usuario
    )
  }
}
