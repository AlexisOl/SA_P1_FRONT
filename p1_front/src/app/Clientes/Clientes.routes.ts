import { Routes } from '@angular/router';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { HotelComponent } from './hotel/hotel.component';
import { HabitacionesPorHotelComponent } from './habitaciones-por-hotel/habitaciones-por-hotel.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { PlatillosPorRestauranteComponent } from './platillos-por-restaurante/platillos-por-restaurante.component';

export const ClientesRoutes: Routes = [

    {path: '', component: PaginaPrincipalComponent},
    {path: 'hoteles', component: HotelComponent},
    {path: 'restaurantes', component: RestauranteComponent},
    {path: 'restaurante/:id', component: PlatillosPorRestauranteComponent},
    {path: 'hotel/:id', component: HabitacionesPorHotelComponent},

];
