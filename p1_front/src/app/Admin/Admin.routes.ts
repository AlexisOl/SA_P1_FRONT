import { Routes } from '@angular/router';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { PaginaPrincipalComponent } from '../Clientes/pagina-principal/pagina-principal.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadosHotelComponent } from './empleados-hotel/empleados-hotel.component';
import { EmpleadosRestauranteComponent } from './empleados-restaurante/empleados-restaurante.component';

export const AdminRoutes: Routes = [

    {path: '', component: PaginaPrincipalComponent},
    {path: 'reservaciones/:id', component: ReservacionesComponent},
    {path: 'facturacion', component: FacturacionComponent},
    {path: 'informacionEmpresarial', component: EmpleadosComponent},
    {path: 'hotel/:id', component: EmpleadosHotelComponent},
    {path: 'restaurante/:id', component: EmpleadosRestauranteComponent},

];
