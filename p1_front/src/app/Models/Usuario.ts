export interface usuario {
     id?:Number;
     username:String;
     password:String;
     persona:number;
     tipoEmpleado:String;
}


export interface persona{
         cui?:Number;
      nombre:String;
 fechaNacimiento:Date;
 direccion:String;
 telefono:String;
 correo:String;
}


export interface empleadoHotel {
     id?: String
     persona:persona
     idhotel:Number
     salario:Number
     fecha:Date
     estado:Boolean
}

export interface empleadoRestaurante {
     id?:String
     persona:persona
     RestauranteId:String
     salario:Number
     fecha:Date
     estado:Boolean
}

