export enum TipoPlatillo  {
    ENTRADA, BEBIDA, PLATILLO_FUERTE, ANTOJITO

}

export interface restaurantes {
     id?:Number;
     nombre:String;
     telefono:String;
     direccion:String;
    idhotel: Number;
}
export interface Platillo {
   id?:Number;
    nombre:String;
     precio:Number;
    tipo:TipoPlatillo;
    idrestaurante:String;
}

export interface calificacionPlatillo {
    comentario:String
    puntuacion:Number
    platillo:Number
}