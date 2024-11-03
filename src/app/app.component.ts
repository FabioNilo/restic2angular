import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaComprasComponent } from './lista-compras/lista-compras.component';

import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaComprasComponent,LoginComponent,NotfoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'list-compras';
 
}
