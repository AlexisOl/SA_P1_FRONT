import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { hotel } from '../../Models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelServicioService {


  readonly URL = environment.URL_GATEWAY+"hotel";
  public listadoHoteles =  signal<hotel[]>([]);

  constructor(private http: HttpClient) {
    this.listarHoteles();
   }



  public listarHoteles() {
    this.http.get<hotel[]>(
      this.URL
    ).subscribe(
      (next:any) => {
        console.log(next);
        
        this.listadoHoteles.set(next)
      },
      (error:any) => {
        console.log(error);
        
      }
    )
  }
}
