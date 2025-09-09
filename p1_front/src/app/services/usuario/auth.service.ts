import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { hotel } from '../../Models/Hotel';
import { restaurantes } from '../../Models/Restaurantes';
import { usuario } from '../../Models/Usuario';
import { Route, Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly URL = environment.URL_GATEWAY+"usuario";
  private  cookieName = 'token';
  public listadoHoteles =  signal<usuario[]>([]);

  constructor(private http: HttpClient, 
    private cookieService: CookieService,
    private router: Router
  ) {
   }



 
   public registrarUsuario(usuario: any):Observable<usuario> {
    return  this.http.post<usuario>(
      this.URL, usuario
    )
  }


  public loginUsuario(username: string, password: string){
    return this.http.post(
      this.URL+"/login", {username, password}, { responseType: 'text'}
    )
  }

  saveToken(token: string): void {
    this.cookieService.set(this.cookieName, token, undefined, '/');
  }

  //obtengo todo el token jwt
  public getToken(): string | null {
    return this.cookieService.get(this.cookieName);
  }

  //decodifico el token y devuelvo el objeto
  private decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  //cerrar sesion -> eliminar la cookie
  logout(): void {
    this.cookieService.delete(this.cookieName, '/');
    this.router.navigate(['/']);

  }

  getIdEmpleado(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idEmpleado) {
      return decodedToken.idEmpleado;
    }
    return null;
  }

  public getIdTipoEmpleado(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.tipoEmpleado.id) {
        return decodedToken.tipoEmpleado.id;
    }
    return null;
  }

  public getTipoEmpleadoNombre(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.tipo) {
        return decodedToken.tipo;
    }
    return null;
  }

  
  public getId(): String | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.id) {
        return decodedToken.id;
    }
    return null;
  }


  public getUsername(): number | null {
    const decodedToken = this.decodeToken();
    
    if (decodedToken && decodedToken.username) {
        return decodedToken.username;
    }
    return null;
  }

  public getNombreArea(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.area.nombre) {
        return decodedToken.area.nombre;
    }
    return null;
  }

  getIATToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.iat) {
      return decodedToken.iat;
    }
    return null;
  }

  getExpToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp;
    }
    return null;
  }

  getNombre(): string | null {
    const decodedToken = this.decodeToken();
    console.log(decodedToken);

    if (decodedToken && decodedToken.nombre) {
      return decodedToken.nombre;
    }
    return null;
  }

  getCui(): number | null {
    const decodedToken = this.decodeToken();
    
    if (decodedToken && decodedToken.cui) {
      return decodedToken.cui;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log("aca"+token);
    
    if (!token) return false;
  
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      const now = Math.floor(Date.now() / 1000);
      return exp && exp > now; 
    } catch (e) {
      return false;
    }
  }
}
