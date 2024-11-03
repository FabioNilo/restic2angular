import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';
import { authGuardFn } from '@auth0/auth0-angular';
import { NotfoundComponent } from './notfound/notfound.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'list', component:ListaComprasComponent,canActivate: [authGuardFn]}, 
    {path: '404', component:NotfoundComponent},
    {path: '**', redirectTo: '404'},
];
