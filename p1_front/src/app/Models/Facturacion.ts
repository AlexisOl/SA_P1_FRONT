export interface FacturacionHotel {
     fecha:Date
 id_reservacion:String
     precio:Number
}


export interface FacturacionRestaurante {
 
}

export interface ListadoElementosDTO{
    idPlatillo:String
    cantidad:Number
}


export interface DetallefacturacionRestauranteDTO {
     idCliente:String |null
     fecha:String
     listadoElementosDTO:ListadoElementosDTO[]
}