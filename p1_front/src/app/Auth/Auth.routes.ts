import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

export const AuthRoutes: Routes = [

    {path: '', component: LoginComponent},
    {path: 'registrarse', component: RegistroComponent},

];
