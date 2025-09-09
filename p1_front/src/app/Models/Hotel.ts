export interface hotel {
         id?: number;
    nombre: String;
    direccion:String;
    telefono:Number;
}


export interface habitacion {
    id?: String;
    numero_habitacion: Number;
    cantidad_camas: Number;
    id_hotel:Number;
    tipoHabitacion:String;
    precio: Number;
    promedio_valoracion: Number;
}


export interface calificacion {
        id?: String;
     comentario:String;
    puntuacion:Number;
      reservacion:reservacion;
}

export interface reservacion {
 id?: String;
 fechaEntrada:Date;
 fechaSalida:Date;
     habitacion?:String;
     idusuario: String|null;
     tipoReservacion?:String
}