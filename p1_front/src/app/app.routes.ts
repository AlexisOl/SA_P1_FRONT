import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { empleadoGuard } from './Guardias/empleado.guard';

export const routes: Routes = [

    {path: 'login', loadChildren: () => import('./Auth/Auth.routes').then(a => a.AuthRoutes)},

    {path: 'hotel_restaurante', loadChildren: () => import('./Clientes/Clientes.routes').then(c => c.ClientesRoutes),
       //  canActivate: [empleadoGuard]
    },
    {path: 'admin', loadChildren: () => import('./Admin/Admin.routes').then(a => a.AdminRoutes),
       //  canActivate: [empleadoGuard]
    },
    
    { path: '**',redirectTo: 'login', pathMatch:'full'},

];
