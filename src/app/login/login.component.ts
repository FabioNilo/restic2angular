import { Component, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService2 } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 
  constructor(
    private authservice: AuthService,
    private router: Router
  ) {
    this.authservice.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/list']);
      }
    });
  }
  
  login() {
    this.authservice.loginWithRedirect()
  }
    
}

  
