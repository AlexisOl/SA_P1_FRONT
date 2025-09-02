import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';

export const routes: Routes = [

    {path: 'login', loadChildren: () => import('./Auth/Auth.routes').then(a => a.AuthRoutes)},
    {path: 'hotel_restaurante', loadChildren: () => import('./Clientes/Clientes.routes').then(c => c.ClientesRoutes)},
    { path: '**',redirectTo: 'login', pathMatch:'full'},

];
