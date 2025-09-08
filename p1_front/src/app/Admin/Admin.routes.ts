import { Routes } from '@angular/router';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { PaginaPrincipalComponent } from '../Clientes/pagina-principal/pagina-principal.component';

export const AdminRoutes: Routes = [

    {path: '', component: PaginaPrincipalComponent},
    {path: 'reservaciones/:id', component: ReservacionesComponent},
    {path: 'facturacion', component: FacturacionComponent},

];
