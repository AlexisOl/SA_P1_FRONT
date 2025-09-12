import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  public carrito = signal<any[]>([])
  public carritoComentarios = signal<any[]>([])
  constructor() { }

  agregarPlatillo(platillo: any, cantidad: Number) {
    this.carrito.update((items) => [
      ...items,
      { ...platillo, cantidad }
    ]);
  }

  eliminarPlatilloCarrito(id:any){
   const carritoActualizdo = this.carrito().filter(item => item.id != id)

   this.carrito.set(carritoActualizdo)
  }

  limpiarCarrito() {
    this.carritoComentarios.set(this.carrito())

    this.carrito.set([]);
  }

    limpiarCarritoComentarios() {

    this.carritoComentarios.set([]);
  }


  getCarritoComentarios(){
    return this.carritoComentarios()
  }

  GenerarListadoCompras() {
    return this.carrito().map(
      (valores ) => ({
            idPlatillo:valores.id,
    cantidad:valores.cantidad
      })
    )
  }


    GenerarListadoComentarios() {
    return this.carritoComentarios().map(
      (valores ) => ({
            platillo:valores.id,
    puntuacion:valores.puntuacion,
    comentario:valores.comentario,
      })
    )
  }
}
