import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile?: User | undefined | null;
  isMenuOpen = false;
  
  constructor(public auth: AuthService){}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
      this.auth.user$.subscribe({
        next: (profile)=> this.profile = profile
      })
  }

  logout() {
    this.auth.logout({ returnTo: window.location.origin }as any);
  }
}
